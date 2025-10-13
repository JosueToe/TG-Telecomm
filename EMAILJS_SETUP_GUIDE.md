# EmailJS Setup Guide for TG Telecomm Website

## 📧 Complete EmailJS Integration Instructions

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

---

### Step 2: Add Email Service

1. In your EmailJS Dashboard, click **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook/Office365**
   - **Yahoo**
   - Or use **Custom SMTP**

4. Follow the connection wizard to link your email account
5. **Copy your Service ID** (e.g., `service_abc1234`) - you'll need this later!

---

### Step 3: Create Email Templates

You need to create **TWO templates** - one for contact inquiries and one for support tickets.

#### Template 1: Contact Form

1. Click **"Email Templates"** in the sidebar
2. Click **"Create New Template"**
3. **Template Name:** `contact_form`
4. **Template ID:** `contact_form` (or copy the auto-generated ID)

**Paste this in the Content section:**

```
Subject: New Service Inquiry from {{from_name}}

---

New service inquiry received from TG Telecomm website:

Customer Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}}
Service Address: {{service_address}}

Plan Interest:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Selected Plan: {{plan_interest}}

Additional Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

---
This inquiry was submitted on: {{submission_date}}

Please respond to {{from_email}} within 24 hours.
```

**Email Settings (bottom of template):**
- **From Name:** TG Telecomm Website
- **From Email:** Use your verified email (e.g., sales@tgtelecomm.com)
- **To Email:** sales@tgtelecomm.com (where you want to receive inquiries)
- **Reply-to:** {{from_email}} (customer's email)
- **Subject:** New Service Inquiry from {{from_name}}

5. Click **"Save"**

---

#### Template 2: Support Ticket

1. Click **"Create New Template"** again
2. **Template Name:** `support_ticket`
3. **Template ID:** `support_ticket` (or copy the auto-generated ID)

**Paste this in the Content section:**

```
Subject: Support Ticket #{{ticket_id}} - {{issue_type}}

---

New support ticket submitted:

Ticket Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ticket ID: {{ticket_id}}
Priority: {{priority}}
Issue Type: {{issue_type}}
Subject: {{subject}}

Customer Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}}
Account Number (if applicable): {{account_number}}

Issue Description:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{issue_description}}

---
Submitted: {{submission_date}}

Please respond to {{from_email}} within 4 hours.
```

**Email Settings:**
- **From Name:** TG Telecomm Support Portal
- **From Email:** Use your verified email
- **To Email:** sales@tgtelecomm.com (or your support email)
- **Reply-to:** {{from_email}} (customer's email)
- **Subject:** Support Ticket #{{ticket_id}} - {{issue_type}}

5. Click **"Save"**

---

### Step 4: Get Your Public Key

1. Click on **"Account"** in the sidebar (or your profile picture)
2. Go to **"API Keys"** or **"General"** tab
3. Find your **Public Key** (looks like: `xYz123AbC456DeF789`)
4. **Copy this key** - you'll need it in the next step!

---

### Step 5: Update Your Website Code

You need to replace placeholder values in **THREE files**:

#### File 1: `index.html` (lines 42-43)

Find this code:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

Replace `YOUR_PUBLIC_KEY` with your actual Public Key:
```javascript
emailjs.init("xYz123AbC456DeF789");  // Use your real key!
```

#### File 2: `script.js` (line 223)

Find this code:
```javascript
emailjs.send('YOUR_SERVICE_ID', 'contact_form', templateParams)
```

Replace `YOUR_SERVICE_ID` with your actual Service ID:
```javascript
emailjs.send('service_abc1234', 'contact_form', templateParams)
```

#### File 3: `ticket.html` (lines 24 and 334)

**Line 24:** Replace the Public Key
```javascript
emailjs.init("xYz123AbC456DeF789");  // Use your real key!
```

**Line 334:** Replace the Service ID
```javascript
emailjs.send('service_abc1234', 'support_ticket', templateParams)
```

---

### Step 6: Test Your Forms!

1. **Save all files**
2. **Open your website** in a browser
3. **Test the Contact Form:**
   - Go to the Contact section
   - Fill out all required fields
   - Click "Submit Request"
   - You should see a success message AND receive an email!

4. **Test the Support Ticket:**
   - Go to `ticket.html` (Open Ticket page)
   - Fill out the support form
   - Click "Submit Ticket"
   - Check your email for the ticket notification!

---

### 🔍 Troubleshooting

**Form doesn't submit / No success message:**
- Check browser console (F12 → Console tab) for errors
- Make sure you replaced ALL placeholder values
- Verify your Public Key is correct

**Email not arriving:**
- Check spam/junk folder
- Verify "To Email" address in EmailJS templates
- Make sure your email service is connected properly
- Try sending a test email from EmailJS dashboard

**"Failed" error message:**
- Public Key might be wrong
- Service ID might be incorrect  
- Template ID might not match (case-sensitive!)
- Check EmailJS dashboard for error logs

---

### 📝 Summary of What You Need:

✅ **Public Key** → Replace in `index.html` (line 42) and `ticket.html` (line 24)
✅ **Service ID** → Replace in `script.js` (line 223) and `ticket.html` (line 334)
✅ **Template IDs:**
   - `contact_form` (already in code)
   - `support_ticket` (already in code)

---

### 💡 Free Plan Limits

EmailJS free plan includes:
- ✅ 200 emails per month
- ✅ 2 email templates
- ✅ 1 email service
- ✅ Basic support

For higher volume, upgrade to a paid plan at [https://www.emailjs.com/pricing](https://www.emailjs.com/pricing)

---

### 🎉 You're All Set!

Once you've completed all steps, your contact forms will send real emails to sales@tgtelecomm.com. Customers will receive confirmation that their inquiry was received!

**Questions?** Check the EmailJS documentation: [https://www.emailjs.com/docs](https://www.emailjs.com/docs)

---

Made with ❤️ by the Host-IT Team

