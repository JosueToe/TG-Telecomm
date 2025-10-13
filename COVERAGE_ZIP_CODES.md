# 📍 TG Telecomm Service Area - ZIP Codes

## Coverage Checker Updated ✅

The coverage checker on your website now validates against your **exact service ZIP codes**.

---

## Service Areas (17 ZIP Codes Total)

### 🏘️ Hialeah (10 ZIP Codes)
- 33002 (PO Box)
- 33010
- 33011 (PO Box)
- 33012
- 33013
- 33014
- 33015
- 33016
- 33017 (PO Box)
- 33018

### 🏭 Medley (2 ZIP Codes)
- 33166
- 33178

### 🏢 Doral (5 ZIP Codes)
- 33122
- 33126
- 33166 (shared with Medley)
- 33172
- 33178 (shared with Medley)

**Note:** ZIP codes 33166 and 33178 are shared between Medley and Doral.

---

## How the Coverage Checker Works

### ✅ ZIP Code Validation
When a customer enters an address or ZIP code:

1. **ZIP Code Extraction:** System automatically finds the 5-digit ZIP code from the input
2. **Validation:** Checks if ZIP is in your service area list
3. **City Detection:** Identifies whether it's Hialeah, Medley, or Doral
4. **Response:**
   - ✅ **In Service Area:** Shows success message with "Get Started" buttons
   - ❌ **Not in Service Area:** Shows "not available" message with notification option

### Example Inputs That Work:
- `33012` ← Just ZIP code
- `123 Main St, Hialeah, FL 33012` ← Full address
- `33166` ← Shared ZIP (detects Medley/Doral)
- `Doral 33122` ← City and ZIP

### Example Response for Valid ZIP:
```
✅ Great News!
✓ TG Telecomm services ZIP 33012 in Hialeah!
We can get you connected in as little as 24 hours!

[Get Started Now] [Call (305) 903-9600]

✓ No Contracts • ✓ Unlimited Bandwidth • ✓ Fast Installation
```

### Example Response for Invalid ZIP:
```
📍 Not Available Yet
We don't currently service ZIP 33101.

We currently service Hialeah, Medley, and Doral areas only.
Leave your info and we'll notify you when we expand to your area!

[Notify Me When Available]

Current Service Areas:
Hialeah • Medley • Doral
```

---

## Features Included

✅ **Automatic ZIP Detection:** Extracts ZIP from any address format
✅ **City Identification:** Shows which city (Hialeah/Medley/Doral)
✅ **Smart Error Handling:** Prompts for ZIP if none found
✅ **Loading Animation:** Shows "Checking coverage..." while processing
✅ **Call-to-Action Buttons:** Different CTAs for serviced vs. non-serviced areas
✅ **Smooth Scrolling:** Auto-scrolls to show results
✅ **Mobile Responsive:** Works perfectly on all devices

---

## Code Location

The coverage checker is implemented in `script.js`:
- **Lines 357-366:** ZIP code list
- **Lines 368-390:** Helper functions (extract, validate, identify city)
- **Lines 392-404:** Form submission handler
- **Lines 406-514:** Display result function

---

## Testing the Coverage Checker

### Test with Valid ZIPs (Should Show "Great News!"):
```
33012  → Hialeah
33166  → Medley
33122  → Doral
33018  → Hialeah
33178  → Medley/Doral
```

### Test with Invalid ZIPs (Should Show "Not Available"):
```
33101  → Downtown Miami (not serviced)
33109  → Miami Beach (not serviced)
33133  → Coral Gables (not serviced)
```

### Test Error Handling:
```
"Miami, FL"  → Should ask for ZIP code
"Downtown"   → Should ask for ZIP code
""          → Required field validation
```

---

## Updating ZIP Codes in the Future

To add or remove ZIP codes, edit `script.js` line 358:

```javascript
const SERVICE_ZIP_CODES = [
    // Hialeah
    '33002', '33010', '33011', '33012', '33013', 
    '33014', '33015', '33016', '33017', '33018',
    // Medley
    '33166', '33178',
    // Doral
    '33122', '33126', '33166', '33172', '33178',
    // Add new cities here
    '33XXX', '33YYY'  // New area
];
```

Also update the city detection function (lines 381-390) if adding new cities.

---

## Customer Experience

### For Serviced Customers:
1. Enters ZIP → Sees instant confirmation
2. Gets phone number + "Get Started" button
3. Can immediately contact or fill out form
4. Sees value props (no contracts, unlimited bandwidth, fast install)

### For Non-Serviced Customers:
1. Enters ZIP → Sees "not available" message
2. Told which areas you DO service
3. Offered "Notify Me" option
4. Can still submit inquiry via contact form

---

## SEO Benefits

The coverage checker helps with:
- ✅ **Local SEO:** Shows you serve specific ZIP codes
- ✅ **User Intent:** Qualifies leads before contact
- ✅ **Conversion:** Clear CTA for serviced areas
- ✅ **Lead Capture:** Collects info from non-serviced areas

---

## Analytics Tracking (Optional)

You can track coverage checks by adding this to the `displayCoverageResult` function:

```javascript
// After line 450 in script.js
if (typeof gtag !== 'undefined') {
    gtag('event', 'coverage_check', {
        'zip_code': zipCode,
        'service_available': isAvailable,
        'city': cityName
    });
}
```

This tracks:
- Which ZIPs people search for
- Success vs. failure rate
- Most popular cities

---

## ✅ Status: LIVE & WORKING

The coverage checker is fully functional and ready for deployment!

Test it on your site at: `/#coverage`

---

Made with ❤️ by the Host-IT Team

**Last Updated:** 2025  
**Total Service ZIPs:** 17  
**Cities Covered:** Hialeah, Medley, Doral

