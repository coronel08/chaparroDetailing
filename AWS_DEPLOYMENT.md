# 🚀 AWS Deployment Guide — Chaparro Detailing

**Stack:** Vite + React → S3 (static hosting) → CloudFront (CDN + HTTPS) → Route 53 (DNS) → Squarespace domain

---

## Overview

```
Browser → Route 53 → CloudFront (HTTPS + CDN) → S3 Bucket (private)
```

S3 is kept **private** — only CloudFront can read it (Origin Access Control).  
CloudFront handles HTTPS/SSL using a free ACM certificate.

---

## Part 1 — S3 Bucket

### 1.1 Create the bucket

1. Go to **S3 → Create bucket**
2. **Bucket name:** `yourdomain.com` (e.g. `chaparrodetailing.com`)
3. **Region:** `us-east-1` (N. Virginia) — required for CloudFront + ACM
4. **Block all public access:** ✅ KEEP ENABLED (CloudFront will access it, not the public)
5. Leave all other settings default → **Create bucket**

### 1.2 Enable Static Website Hosting (optional but useful for error routing)

1. Open the bucket → **Properties** tab
2. Scroll to **Static website hosting** → **Edit**
3. **Enable** it
4. Index document: `index.html`
5. Error document: `index.html` ← this is critical for React Router (SPA routing)
6. Save

> ⚠️ Even with static website hosting enabled, keep the bucket **private**.
> The website endpoint won't work publicly — that's fine, CloudFront handles traffic.

---

## Part 2 — SSL Certificate (ACM)

> ⚠️ **MUST be created in `us-east-1`** regardless of where your bucket is.

1. Go to **AWS Certificate Manager (ACM)** — make sure you're in **us-east-1**
2. Click **Request a certificate** → **Request a public certificate**
3. Add domain names:
   - `yourdomain.com`
   - `www.yourdomain.com`
4. Validation method: **DNS validation** (recommended)
5. Click **Request**
6. Click into the pending certificate → expand the domain names

### ⚠️ YOU ARE HERE — Two paths to validate your cert:

#### Path A (Recommended — do this first): Validate via Squarespace DNS temporarily
> Use this if you want to get your cert issued quickly while Squarespace is still your DNS host.

1. In the ACM pending certificate, you'll see two CNAME records to add, like:
   ```
   Name:  _abc123def456.yourdomain.com
   Value: _xyz789.acm-validations.aws.
   ```
   ```
   Name:  _abc123def456.www.yourdomain.com
   Value: _xyz789.acm-validations.aws.
   ```
2. Log in to **Squarespace → Domains → yourdomain.com → DNS Settings**
3. Scroll down to **Custom Records** → click **Add Record**
4. For each CNAME record:
   - Type: `CNAME`
   - Host: the `Name` value — **strip your domain from the end**, just paste the prefix e.g. `_abc123def456`
   - Value/Data: the full `Value` from ACM
5. Save → wait 5–15 minutes → ACM status will show **Issued** ✅

#### Path B: Skip straight to Route 53 now
> Do Part 4 first (create Route 53 hosted zone), switch Squarespace nameservers to Route 53, then come back and click **"Create records in Route 53"** in ACM.

7. Once cert is **Issued**, continue to Part 3 ✅

---

## Part 3 — CloudFront Distribution

1. Go to **CloudFront → Create distribution**

### Origin Settings
| Field | Value |
|-------|-------|
| Origin domain | Select your S3 bucket from the dropdown (use the **REST endpoint**, NOT the website endpoint) |
| Origin access | **Origin access control settings (recommended)** |
| Create control setting | Click **Create new OAC** → accept defaults → Create |

### Default cache behavior
| Field | Value |
|-------|-------|
| Viewer protocol policy | **Redirect HTTP to HTTPS** |
| Allowed HTTP methods | `GET, HEAD` |
| Cache policy | `CachingOptimized` (AWS managed) |

### Settings
| Field | Value |
|-------|-------|
| Alternate domain names (CNAMEs) | `yourdomain.com` and `www.yourdomain.com` |
| Custom SSL certificate | Select the ACM cert you created in Part 2 |
| Default root object | `index.html` |

2. Click **Create distribution** — takes ~5–10 min to deploy

### 3.1 Update S3 Bucket Policy (CloudFront OAC)

After creating the distribution, CloudFront will show a banner:
> "The S3 bucket policy needs to be updated"

Click **Copy policy** then:
1. Go to your S3 bucket → **Permissions** → **Bucket policy**
2. Paste and save the policy

It will look like this:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::yourdomain.com/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DIST_ID"
        }
      }
    }
  ]
}
```

### 3.2 Fix SPA Routing (404 → index.html)

React Router needs all 404s to return `index.html` so client-side routing works:

1. CloudFront distribution → **Error pages** tab
2. **Create custom error response**:
   - HTTP error code: `403`
   - Response page path: `/index.html`
   - HTTP response code: `200`
3. **Create another**:
   - HTTP error code: `404`
   - Response page path: `/index.html`
   - HTTP response code: `200`

---

## Part 4 — Route 53 Hosted Zone

1. Go to **Route 53 → Hosted zones → Create hosted zone**
2. Domain name: `yourdomain.com`
3. Type: **Public hosted zone**
4. **Create**

After creation, Route 53 gives you **4 nameservers** (NS records), e.g.:
```
ns-123.awsdns-45.com
ns-678.awsdns-90.net
ns-111.awsdns-22.org
ns-444.awsdns-55.co.uk
```
**Save these** — you'll need them for Squarespace in Part 5.

### 4.1 Create DNS Records

In your hosted zone, create the following records:

#### Root domain → CloudFront
- **Record name:** (leave blank for root `@`)
- **Record type:** `A`
- **Alias:** ✅ Yes
- **Route traffic to:** `Alias to CloudFront distribution`
- Select your CloudFront distribution
- **Create record**

#### www → CloudFront
- **Record name:** `www`
- **Record type:** `A`
- **Alias:** ✅ Yes
- **Route traffic to:** `Alias to CloudFront distribution`
- Select your CloudFront distribution
- **Create record**

---

## Part 5 — Point Squarespace to Route 53

> ⚠️ Since you just bought the domain on Squarespace, you need to **unlock it** first.

### 5.1 Unlock the domain (required for new domains)

1. Log in to **Squarespace → Domains → yourdomain.com**
2. Click **Domain Settings** (or the gear icon)
3. Scroll to **Domain Lock** and turn it **OFF** (domains are locked by default for 60 days after purchase — Squarespace may warn you but still allow nameserver changes)

> 💡 If Squarespace doesn't allow nameserver changes yet (60-day lock), you can still use Path A above to get ACM validated and finish all AWS setup. Then switch nameservers once the lock expires. Your site will be fully wired and ready the moment DNS switches over.

### 5.2 Change nameservers to Route 53

1. Go to **Squarespace → Domains → yourdomain.com → DNS Settings**
2. Scroll to **Nameservers** section
3. Click **Use Custom Nameservers** (or **Edit Nameservers**)
4. **Delete** the existing Squarespace nameservers
5. Add all 4 Route 53 nameservers from Part 4, one per field:
   ```
   ns-123.awsdns-45.com
   ns-678.awsdns-90.net
   ns-111.awsdns-22.org
   ns-444.awsdns-55.co.uk
   ```
6. Confirm / Save ✅

> ⏳ DNS propagation takes **24–48 hours** but usually updates within 1–4 hours.
> Check with: `nslookup yourdomain.com 8.8.8.8`
> You should see Route 53 nameservers in the response.

### 5.3 Remove the temporary ACM CNAME records from Squarespace
Once the nameservers have fully switched to Route 53, you can delete the ACM validation CNAME records you added in Squarespace (Part 2, Path A). They're no longer needed — Route 53 now owns DNS.

---

## Part 6 — IAM User for GitHub Actions

Never use your root AWS account credentials. Create a dedicated deploy user.

### 6.1 Create IAM Policy

1. Go to **IAM → Policies → Create policy**
2. Switch to **JSON** and paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3Deploy",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::yourdomain.com",
        "arn:aws:s3:::yourdomain.com/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidate",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DIST_ID"
    }
  ]
}
```

3. Name it: `ChaparroDetailing-Deploy-Policy`
4. Create policy

### 6.2 Create IAM User

1. **IAM → Users → Create user**
2. Username: `chaparrodetailing-github-deploy`
3. **Do NOT** check "provide access to AWS Console"
4. Next → **Attach policies directly** → select `ChaparroDetailing-Deploy-Policy`
5. Create user
6. Click into the user → **Security credentials** tab
7. **Create access key** → Use case: **Application running outside AWS**
8. Download/copy the **Access Key ID** and **Secret Access Key** — shown only once!

---

## Part 7 — GitHub Secrets

1. Go to your GitHub repo → **Settings → Secrets and variables → Actions**
2. Click **New repository secret** and add all 3:

| Secret Name | Value |
|-------------|-------|
| `AWS_ACCESS_KEY_ID` | The access key ID from Part 6 |
| `AWS_SECRET_ACCESS_KEY` | The secret access key from Part 6 |
| `S3_BUCKET_NAME` | `yourdomain.com` (your bucket name) |
| `CLOUDFRONT_DISTRIBUTION_ID` | Found in CloudFront → your distribution → ID (e.g. `E1ABCDEF123456`) |

---

## Part 8 — Deploy!

```bash
git add .
git commit -m "chore: add AWS deployment workflow"
git push origin main
```

Watch the **Actions** tab in GitHub — the workflow will:
1. Install dependencies
2. Build (`npm run build`)
3. Sync `dist/` to S3
4. Invalidate the CloudFront cache

Your site will be live at `https://yourdomain.com` 🎉

---

## Costs (Approximate)

| Service | Monthly Cost |
|---------|-------------|
| S3 (static files ~10MB) | ~$0.01 |
| CloudFront (first 1TB free/month) | Free tier |
| Route 53 Hosted Zone | $0.50/month |
| ACM Certificate | **Free** |
| **Total** | **~$0.51/month** |

---

## Quick Reference

```bash
# Check DNS propagation
nslookup yourdomain.com 8.8.8.8

# Manually sync to S3 (if needed)
aws s3 sync dist/ s3://yourdomain.com --delete

# Manually invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```
