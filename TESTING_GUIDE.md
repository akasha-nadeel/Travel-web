# 🧪 Phase 4 Testing Guide (Updated)

Follow these steps to verify the functionality of the **Ticket Booking System** and User Authentication.

## 🟢 Part 1: Ticket Booking Test

### 1. Navigation
1.  Open `index.html`.
2.  Locate the **"Book Now"** button in the top navigation bar.
3.  Click it.
    *   **Expected Result**: You are redirected to `booking.html`.

### 2. Booking Form Features
1.  **Step 1 (Visit Details)**:
    *   Select a **Visit Date** (e.g., tomorrow).
    *   *Note: Past dates should be disabled.*
    *   Increase **Adults** to 2.
    *   Click "Continue to Ticket Selection". -> *Should move to Step 2*.
2.  **Step 2 (Ticket Type)**:
    *   Select the **Guided Tour** ticket ($55/person).
    *   Click "Continue". -> *Should move to Step 3*.
3.  **Step 3 (Travelers)**:
    *   Enter Name: `Test User`.
    *   Enter Email: `test@example.com`.
    *   Enter Phone: `1234567890`.
    *   Select Nationality.
    *   Click "Continue". -> *Should move to Step 4*.
4.  **Step 4 (Payment)**:
    *   Enter Card Number: `4242424242424242` (watch it auto-space).
    *   Enter Expiry: `12/30`.
    *   Enter CVV: `123`.
    *   Enter Name: `Test User`.
    *   Click **"Confirm & Pay"**.

### 3. Confirmation
*   **Expected Result**:
    *   Button shows "Processing...".
    *   After a delay, the **Confirmation Screen** appears.
    *   A unique **Ticket ID** (e.g., `TKT-2026-xxxx`) is displayed.
    *   The "Booking Summary" sidebar shows the correct Total Price (approx $115 for 2 people with fee).

---

## 🔵 Part 2: Authentication Test

### 1. Login Test
1.  Go back to `index.html`.
2.  Click the **User Icon** (top right, between Wishlist and Book Now).
3.  **Sign Up**:
    *   Click the "Sign Up" tab.
    *   Name: `Demo User`.
    *   Email: `demo@example.com`.
    *   Password: `password123`.
    *   Confirm Password: `password123`.
    *   Click "Create Account".
4.  **Verification**:
    *   Modal should close.
    *   User Icon should change to an **Avatar** (circle with "D").
    *   Clicking the Avatar should show the **Dropdown Menu**.

### 2. Logout Test
1.  Open the User Dropdown.
2.  Click **Logout**.
3.  **Expected Result**:
    *   Avatar reverts to the default User Icon.
