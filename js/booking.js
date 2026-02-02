// ========================================
// BOOKING SYSTEM LOGIC
// ========================================

class BookingSystem {
    constructor() {
        this.currentStep = 1;
        this.bookingData = {
            destination: 'Sigiriya',
            destinationLocation: 'Cultural Triangle, Sri Lanka',
            checkIn: '',
            checkOut: '',
            adults: 2,
            children: 0,
            package: '',
            packagePrice: 0,
            fullName: '',
            email: '',
            phone: '',
            nationality: '',
            specialRequests: '',
            totalPrice: 0
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateSummary();
        this.setMinDates();
        this.loadDestinationFromURL();
    }

    setupEventListeners() {
        // Back button
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.history.back();
            });
        }

        // Traveler counters
        document.querySelectorAll('.counter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCounterClick(e));
        });

        // Package selection
        document.querySelectorAll('.btn-select-package').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectPackage(e));
        });

        // Date inputs
        document.getElementById('checkIn')?.addEventListener('change', (e) => {
            this.bookingData.checkIn = e.target.value;
            this.updateCheckOutMin();
            this.updateSummary();
        });

        document.getElementById('checkOut')?.addEventListener('change', (e) => {
            this.bookingData.checkOut = e.target.value;
            this.updateSummary();
        });

        // Form inputs
        document.getElementById('fullName')?.addEventListener('input', (e) => {
            this.bookingData.fullName = e.target.value;
        });

        document.getElementById('email')?.addEventListener('input', (e) => {
            this.bookingData.email = e.target.value;
        });

        document.getElementById('phone')?.addEventListener('input', (e) => {
            this.bookingData.phone = e.target.value;
        });

        document.getElementById('nationality')?.addEventListener('change', (e) => {
            this.bookingData.nationality = e.target.value;
        });

        document.getElementById('specialRequests')?.addEventListener('input', (e) => {
            this.bookingData.specialRequests = e.target.value;
        });

        // Card number formatting
        document.getElementById('cardNumber')?.addEventListener('input', (e) => {
            this.formatCardNumber(e.target);
        });

        // Expiry date formatting
        document.getElementById('expiryDate')?.addEventListener('input', (e) => {
            this.formatExpiryDate(e.target);
        });

        // CVV validation
        document.getElementById('cvv')?.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
        });
    }

    setMinDates() {
        const today = new Date().toISOString().split('T')[0];
        const checkInInput = document.getElementById('checkIn');
        const checkOutInput = document.getElementById('checkOut');

        if (checkInInput) checkInInput.min = today;
        if (checkOutInput) checkOutInput.min = today;
    }

    updateCheckOutMin() {
        const checkInInput = document.getElementById('checkIn');
        const checkOutInput = document.getElementById('checkOut');

        if (checkInInput && checkOutInput && checkInInput.value) {
            const checkInDate = new Date(checkInInput.value);
            checkInDate.setDate(checkInDate.getDate() + 1);
            checkOutInput.min = checkInDate.toISOString().split('T')[0];
        }
    }

    loadDestinationFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const destinationId = urlParams.get('destination');

        if (destinationId) {
            // You can load destination data from destinations-data.js if needed
            // For now, we'll use the default Sigiriya
        }
    }

    handleCounterClick(e) {
        const btn = e.currentTarget;
        const action = btn.dataset.action;
        const type = btn.dataset.type;
        const countElement = document.getElementById(`${type}Count`);

        let currentValue = parseInt(countElement.textContent);

        if (action === 'increase') {
            currentValue++;
        } else if (action === 'decrease' && currentValue > 0) {
            currentValue--;
        }

        // Ensure at least 1 adult
        if (type === 'adults' && currentValue < 1) {
            currentValue = 1;
        }

        countElement.textContent = currentValue;
        this.bookingData[type] = currentValue;
        this.updateSummary();
    }

    selectPackage(e) {
        const packageCard = e.target.closest('.package-card');
        const packageType = packageCard.dataset.package;

        // Remove selected class from all cards
        document.querySelectorAll('.package-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selected class to clicked card
        packageCard.classList.add('selected');

        // Update booking data
        this.bookingData.package = packageType;

        // Set package price
        const prices = {
            'standard': 150,
            'premium': 250,
            'luxury': 450
        };

        this.bookingData.packagePrice = prices[packageType];
        this.updateSummary();
    }

    calculateDuration() {
        if (!this.bookingData.checkIn || !this.bookingData.checkOut) {
            return 0;
        }

        const checkIn = new Date(this.bookingData.checkIn);
        const checkOut = new Date(this.bookingData.checkOut);
        const diffTime = Math.abs(checkOut - checkIn);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    }

    calculateTotal() {
        const basePrice = this.bookingData.packagePrice * (this.bookingData.adults + this.bookingData.children * 0.5);
        const serviceFee = basePrice * 0.1; // 10% service fee
        return basePrice + serviceFee;
    }

    formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    updateSummary() {
        // Update dates
        document.getElementById('summaryCheckIn').textContent = this.formatDate(this.bookingData.checkIn);
        document.getElementById('summaryCheckOut').textContent = this.formatDate(this.bookingData.checkOut);

        // Update duration
        const duration = this.calculateDuration();
        document.getElementById('summaryDuration').textContent = duration > 0 ? `${duration} ${duration === 1 ? 'day' : 'days'}` : '-';

        // Update travelers
        let travelersText = '';
        if (this.bookingData.adults > 0) {
            travelersText += `${this.bookingData.adults} ${this.bookingData.adults === 1 ? 'Adult' : 'Adults'}`;
        }
        if (this.bookingData.children > 0) {
            travelersText += `, ${this.bookingData.children} ${this.bookingData.children === 1 ? 'Child' : 'Children'}`;
        }
        document.getElementById('summaryTravelers').textContent = travelersText || '2 Adults';

        // Update package
        const packageName = this.bookingData.package ?
            this.bookingData.package.charAt(0).toUpperCase() + this.bookingData.package.slice(1) : '-';
        document.getElementById('summaryPackage').textContent = packageName;

        // Update pricing
        const basePrice = this.bookingData.packagePrice * (this.bookingData.adults + this.bookingData.children * 0.5);
        const serviceFee = basePrice * 0.1;
        const total = this.calculateTotal();

        document.getElementById('summaryBasePrice').textContent = `$${basePrice.toFixed(0)}`;
        document.getElementById('summaryServiceFee').textContent = `$${serviceFee.toFixed(0)}`;
        document.getElementById('summaryTotal').textContent = `$${total.toFixed(0)}`;

        this.bookingData.totalPrice = total;
    }

    formatCardNumber(input) {
        let value = input.value.replace(/\s/g, '').replace(/\D/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        input.value = formattedValue;
    }

    formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        input.value = value;
    }

    validateStep(step) {
        switch (step) {
            case 1:
                if (!this.bookingData.checkIn || !this.bookingData.checkOut) {
                    alert('Please select check-in and check-out dates');
                    return false;
                }
                if (new Date(this.bookingData.checkIn) >= new Date(this.bookingData.checkOut)) {
                    alert('Check-out date must be after check-in date');
                    return false;
                }
                return true;

            case 2:
                if (!this.bookingData.package) {
                    alert('Please select a package');
                    return false;
                }
                return true;

            case 3:
                const fullName = document.getElementById('fullName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const nationality = document.getElementById('nationality').value;

                if (!fullName || !email || !phone || !nationality) {
                    alert('Please fill in all required fields');
                    return false;
                }

                // Basic email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return false;
                }

                return true;

            case 4:
                const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
                const expiryDate = document.getElementById('expiryDate').value;
                const cvv = document.getElementById('cvv').value;
                const cardName = document.getElementById('cardName').value;

                if (!cardNumber || !expiryDate || !cvv || !cardName) {
                    alert('Please fill in all payment details');
                    return false;
                }

                if (cardNumber.length !== 16) {
                    alert('Please enter a valid 16-digit card number');
                    return false;
                }

                if (cvv.length !== 3) {
                    alert('Please enter a valid 3-digit CVV');
                    return false;
                }

                return true;

            default:
                return true;
        }
    }

    goToStep(step) {
        // Hide all steps
        document.querySelectorAll('.booking-step').forEach(s => {
            s.classList.remove('active');
        });

        // Show target step
        document.getElementById(`step${step}`).classList.add('active');

        // Update progress indicator
        document.querySelectorAll('.progress-step').forEach((s, index) => {
            s.classList.remove('active', 'completed');
            if (index + 1 < step) {
                s.classList.add('completed');
            } else if (index + 1 === step) {
                s.classList.add('active');
            }
        });

        this.currentStep = step;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    generateBookingId() {
        const date = new Date();
        const year = date.getFullYear();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `SL-${year}-${random}`;
    }

    saveBooking() {
        const bookingId = this.generateBookingId();
        const booking = {
            id: bookingId,
            ...this.bookingData,
            createdAt: new Date().toISOString(),
            status: 'confirmed'
        };

        // Save to localStorage
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        return bookingId;
    }

    showConfirmation() {
        const bookingId = this.saveBooking();

        // Update confirmation details
        document.getElementById('bookingId').textContent = bookingId;
        document.getElementById('confirmDestination').textContent = this.bookingData.destination;
        document.getElementById('confirmDates').textContent =
            `${this.formatDate(this.bookingData.checkIn)} - ${this.formatDate(this.bookingData.checkOut)}`;
        document.getElementById('confirmTotal').textContent = `$${this.bookingData.totalPrice.toFixed(0)}`;

        // Show confirmation step
        document.querySelectorAll('.booking-step').forEach(s => {
            s.classList.remove('active');
        });
        document.getElementById('confirmation').classList.add('active');

        // Hide progress indicator
        document.querySelector('.booking-progress').style.display = 'none';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Confetti animation (optional)
        this.celebrateBooking();
    }

    celebrateBooking() {
        // Simple celebration - you can add confetti library here
        console.log('🎉 Booking confirmed!');
    }
}

// Initialize booking system
const bookingSystem = new BookingSystem();

// Global functions for button clicks
function nextStep() {
    if (bookingSystem.validateStep(bookingSystem.currentStep)) {
        bookingSystem.goToStep(bookingSystem.currentStep + 1);
    }
}

function prevStep() {
    bookingSystem.goToStep(bookingSystem.currentStep - 1);
}

function confirmBooking() {
    if (bookingSystem.validateStep(4)) {
        // Simulate payment processing
        const confirmBtn = document.querySelector('.btn-confirm');
        confirmBtn.textContent = 'Processing...';
        confirmBtn.disabled = true;

        setTimeout(() => {
            bookingSystem.showConfirmation();
        }, 1500);
    }
}

// Handle page navigation
window.addEventListener('beforeunload', (e) => {
    if (bookingSystem.currentStep > 1 && bookingSystem.currentStep < 5) {
        e.preventDefault();
        e.returnValue = '';
    }
});
