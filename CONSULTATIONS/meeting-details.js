// Function to update meeting details based on meeting type
function updateMeetingDetails(meetingData) {
    // Get DOM elements
    const priceBadge = document.querySelector('.price-badge');
    const doctorName = document.querySelector('.meta-item:nth-child(3) span');
    const paymentSection = document.getElementById('paymentSection');
    const instructorName = document.querySelector('.instructor-details h4');
    const instructorTitle = document.querySelector('.instructor-details p:first-of-type');
    const instructorImage = document.querySelector('.instructor-image');
    const meetingTitle = document.querySelector('.meeting-title-section h1');
    const meetingDescription = document.querySelector('.meeting-description');
    const keyPoints = document.querySelector('.key-points ul');
    const sessionDetails = document.querySelector('.session-details ul');

    // Update meeting title and description
    meetingTitle.textContent = meetingData.title;
    meetingDescription.textContent = meetingData.description;

    // Update key points
    if (meetingData.keyPoints && meetingData.keyPoints.length > 0) {
        keyPoints.innerHTML = meetingData.keyPoints.map(point => `<li>${point}</li>`).join('');
    }

    // Update session details
    if (meetingData.sessionDetails && meetingData.sessionDetails.length > 0) {
        sessionDetails.innerHTML = meetingData.sessionDetails.map(detail => 
            `<li><i class="fas fa-check"></i> ${detail}</li>`
        ).join('');
    }

    // Update price badge and payment section
    if (meetingData.isFree) {
        priceBadge.textContent = 'Free';
        priceBadge.classList.add('free-badge');
        paymentSection.style.display = 'none';
    } else {
        priceBadge.textContent = `₹${meetingData.price}`;
        priceBadge.classList.remove('free-badge');
        paymentSection.style.display = 'block';
        
        // Update payment details
        const basePrice = document.querySelector('.price-item:first-child span:last-child');
        const discount = document.querySelector('.price-item.discount span:last-child');
        const finalPrice = document.querySelector('.price-item.total span:last-child');
        
        basePrice.textContent = `₹${meetingData.basePrice}`;
        discount.textContent = `-₹${meetingData.discount}`;
        finalPrice.textContent = `₹${meetingData.price}`;
    }

    // Update doctor information
    doctorName.textContent = meetingData.doctorName;
    instructorName.textContent = meetingData.doctorName;
    instructorTitle.textContent = meetingData.doctorTitle;
    
    // Update doctor image if provided
    if (meetingData.doctorImage) {
        instructorImage.src = meetingData.doctorImage;
        instructorImage.alt = meetingData.doctorName;
    }
}

// Example usage:
// const meetingData = {
//     isFree: false,
//     title: "Prenatal Nutrition Consultation",
//     description: "Join Dr. Sarah Johnson for an informative group session on prenatal nutrition. Learn essential dietary guidelines, understand nutritional needs during different stages of pregnancy, and get expert answers to your nutrition-related questions.",
//     price: 999,
//     basePrice: 1499,
//     discount: 500,
//     doctorName: "Dr. Sarah Johnson",
//     doctorTitle: "Certified Nutritionist & Pregnancy Care Specialist",
//     doctorImage: "../DASHBOARD/profile-user.png",
//     keyPoints: [
//         "Essential nutrients for a healthy pregnancy",
//         "Meal planning and portion control",
//         "Foods to avoid during pregnancy",
//         "Managing morning sickness through diet",
//         "Healthy weight gain guidelines"
//     ],
//     sessionDetails: [
//         "Live Q&A session included",
//         "Downloadable nutrition guide",
//         "Meal planning templates",
//         "Recording available for 30 days",
//         "Certificate of completion"
//     ]
// };
// updateMeetingDetails(meetingData); 