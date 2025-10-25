// Initialize Stripe with your publishable key
// Test mode: pk_test_... (for development)
// Live mode: pk_live_... (for production)
// Get your keys from: https://dashboard.stripe.com/test/apikeys
const stripe = Stripe('pk_test_51SME8AL4HuSuidSILL9HyTXn1t03rRezflna8jtbGUXnPQ9zgebn7aH95Nw3GqpX30MAmiFUmdF6JzcR3HR1WfcH00aN6BcBwQ');
const elements = stripe.elements();

// Package pricing configuration
const packages = {
    starter: {
        name: 'Starter Package',
        fullPrice: 697,
        discountPrice: 627, // 10% off
        deposit50: 349,
        monthly6: 58,
        monthly3: 116
    },
    professional: {
        name: 'Professional Package',
        fullPrice: 1497,
        discountPrice: 1347, // 10% off
        deposit50: 748,
        monthly6: 125,
        monthly3: 250
    },
    premium: {
        name: 'Premium Package',
        fullPrice: 2000,
        discountPrice: 1797, // 10% off
        deposit50: 998,
        monthly6: 167,
        monthly3: 334
    }
};

// Create card element with custom styling
const cardElement = elements.create('card', {
    style: {
        base: {
            fontSize: '16px',
            color: '#1e3a8a',
            fontFamily: 'Inter, sans-serif',
            '::placeholder': {
                color: '#94a3b8',
            },
        },
        invalid: {
            color: '#ef4444',
        },
    },
});

cardElement.mount('#card-element');

// Handle real-time validation errors from the card element
cardElement.addEventListener('change', (event) => {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

// Package selection logic
const packageOptions = document.querySelectorAll('.plan-option[data-package]');
let selectedPackage = 'professional'; // Default
let selectedPlan = '6month'; // Default

packageOptions.forEach(option => {
    option.addEventListener('click', () => {
        packageOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        const radio = option.querySelector('input[type="radio"]');
        radio.checked = true;
        selectedPackage = option.dataset.package;
        updatePricing();
        updateSummary();
    });
});

// Payment plan selection logic
const planOptions = document.querySelectorAll('.plan-option[data-plan]');

planOptions.forEach(option => {
    option.addEventListener('click', () => {
        planOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        const radio = option.querySelector('input[type="radio"]');
        radio.checked = true;
        selectedPlan = option.dataset.plan;
        updateSummary();
    });
});

// Update pricing display when package changes
function updatePricing() {
    const pkg = packages[selectedPackage];
    
    // Update 6-month plan
    document.getElementById('price-6month').textContent = 
        `$${pkg.deposit50} + $${pkg.monthly6}/mo`;
    
    // Update 3-month plan
    document.getElementById('price-3month').textContent = 
        `$${pkg.deposit50} + $${pkg.monthly3}/mo`;
    
    // Update full payment
    document.getElementById('price-full').textContent = 
        `$${pkg.discountPrice}`;
}

// Update order summary sidebar
function updateSummary() {
    const pkg = packages[selectedPackage];
    
    // Update package name
    document.getElementById('summary-package').textContent = pkg.name;
    
    // Update plan type
    let planText = '';
    let todayAmount = 0;
    let futureText = '';
    let totalAmount = pkg.fullPrice;
    
    switch(selectedPlan) {
        case '6month':
            planText = '6 Monthly Payments';
            todayAmount = pkg.deposit50;
            futureText = `$${pkg.monthly6}/mo × 6`;
            break;
        case '3month':
            planText = '3 Monthly Payments';
            todayAmount = pkg.deposit50;
            futureText = `$${pkg.monthly3}/mo × 3`;
            break;
        case 'full':
            planText = 'Pay in Full (Save 10%)';
            todayAmount = pkg.discountPrice;
            futureText = 'None';
            totalAmount = pkg.discountPrice;
            break;
    }
    
    document.getElementById('summary-plan').textContent = planText;
    document.getElementById('summary-today').textContent = `$${todayAmount.toFixed(2)}`;
    document.getElementById('summary-future').textContent = futureText;
    document.getElementById('summary-total').textContent = `$${totalAmount.toFixed(2)}`;
    document.getElementById('button-amount').textContent = `($${todayAmount.toFixed(2)})`;
}

// Handle form submission
const form = document.getElementById('payment-form');
const submitButton = document.getElementById('submit-button');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Disable button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // Calculate amount to charge today
    const pkg = packages[selectedPackage];
    let amountToCharge;
    
    switch(selectedPlan) {
        case '6month':
        case '3month':
            amountToCharge = pkg.deposit50;
            break;
        case 'full':
            amountToCharge = pkg.discountPrice;
            break;
    }
    
    try {
        // Create payment intent on your server
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amountToCharge * 100, // Convert to cents
                package: selectedPackage,
                paymentPlan: selectedPlan,
                customerInfo: {
                    name: fullName,
                    email: email,
                    phone: phone
                }
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Payment failed');
        }
        
        // Confirm the payment with Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(
            data.clientSecret,
            {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: fullName,
                        email: email,
                        phone: phone
                    }
                }
            }
        );
        
        if (error) {
            // Show error to customer
            document.getElementById('card-errors').textContent = error.message;
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-lock"></i><span>Complete Secure Payment</span><span id="button-amount"></span>';
            updateSummary();
        } else {
            // Payment succeeded!
            // Store order details
            const orderDetails = {
                orderId: paymentIntent.id,
                package: selectedPackage,
                packageName: pkg.name,
                paymentPlan: selectedPlan,
                amountPaid: amountToCharge,
                totalAmount: selectedPlan === 'full' ? pkg.discountPrice : pkg.fullPrice,
                customerName: fullName,
                customerEmail: email,
                customerPhone: phone,
                timestamp: new Date().toISOString()
            };
            
            // Store in localStorage for success page
            localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
            
            // Redirect to success page
            window.location.href = 'payment-success.html';
        }
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('card-errors').textContent = 
            'An error occurred processing your payment. Please try again.';
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-lock"></i><span>Complete Secure Payment</span><span id="button-amount"></span>';
        updateSummary();
    }
});

// Initialize pricing and summary on page load
updatePricing();
updateSummary();

// Pre-fill from URL parameters if coming from main page
const urlParams = new URLSearchParams(window.location.search);
const packageParam = urlParams.get('package');

if (packageParam && packages[packageParam]) {
    selectedPackage = packageParam;
    packageOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.package === packageParam) {
            option.classList.add('selected');
            option.querySelector('input[type="radio"]').checked = true;
        }
    });
    updatePricing();
    updateSummary();
}
