document.getElementById('navigationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const depth = parseFloat(document.getElementById('depth').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const systemType = document.getElementById('systemType').value;

    if (depth < 0 || temperature < -2) { // Assuming minimum temperature is -2°C
        alert("Please enter valid values for depth and temperature.");
        return;
    }

    // Simple sound velocity calculation (example)
    const soundVelocity = 1449.2 + 4.6 * temperature - 0.055 * Math.pow(temperature, 2) + (1.39 * depth);
    
    // Dynamic output based on system type
    let positioningMethod;
    switch (systemType) {
        case 'INS':
            positioningMethod = 'Inertial Navigation System';
            break;
        case 'Acoustic':
            positioningMethod = 'Acoustic Positioning System';
            break;
        case 'Hybrid':
            positioningMethod = 'Hybrid System';
            break;
    }

    document.getElementById('results').innerHTML = `
        <p>Sound Velocity: ${soundVelocity.toFixed(2)} m/s</p>
        <p>Using ${positioningMethod}</p>
    `;

    // Draw the graph
    drawGraph(depth, soundVelocity);
    
    // Display case study information
    displayCaseStudy(systemType);
});

function drawGraph(depth, soundVelocity) {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set graph properties
    const margin = 50; // Increase margin for labels
    const canvasHeight = canvas.height - margin * 2;
    const canvasWidth = canvas.width - margin * 2;
    
    // Scale values for display
    const scaledVelocity = (soundVelocity / 1600) * canvasHeight; // Scale for better visualization
    const scaledDepth = (depth / 100) * canvasHeight; // Scale depth for display purposes

    // Draw X and Y axes
    ctx.beginPath();
    ctx.moveTo(margin, canvas.height - margin);
    ctx.lineTo(margin, margin);
    ctx.lineTo(canvas.width - margin, canvas.height - margin);
    ctx.strokeStyle = '#00796b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the sound velocity as a bar
    ctx.fillStyle = '#00796b';
    ctx.fillRect(margin + 10, canvas.height - margin - scaledVelocity, 20, scaledVelocity);

    // Draw the depth as a line
    ctx.strokeStyle = '#d32f2f';
    ctx.beginPath();
    ctx.moveTo(margin + 50, canvas.height - margin - scaledDepth);
    ctx.lineTo(margin + 50 + 20, canvas.height - margin - scaledDepth);
    ctx.stroke();

    // Title
    ctx.font = "20px Arial";
    ctx.fillText("Underwater Navigation System Graph", margin + 60, margin - 10);

    // Y-axis label
    ctx.save();
    ctx.translate(margin / 2, canvas.height / 2); // Move to a position for vertical text
    ctx.rotate(-Math.PI / 2); // Rotate for vertical text
    ctx.fillText("Sound Velocity (m/s)", 0, 0);
    ctx.restore();

    // X-axis label
    ctx.fillText("Depth (m)", canvas.width / 2, canvas.height - margin / 2);

    // Grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;

    // Draw horizontal grid lines
    for (let i = 0; i <= 10; i++) {
        const y = canvas.height - margin - (canvasHeight / 10) * i;
        ctx.beginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(canvas.width - margin, y);
        ctx.stroke();
    }

    // Draw vertical grid lines
    for (let i = 0; i <= 10; i++) {
        const x = margin + (canvasWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, margin);
        ctx.lineTo(x, canvas.height - margin);
        ctx.stroke();
    }

    ctx.font = "16px Arial";
    ctx.fillText(`Sound Velocity at Depth ${depth}m: ${soundVelocity.toFixed(2)} m/s`, 50, 50);
}

function displayCaseStudy(systemType) {
    let caseStudyContent;
    switch (systemType) {
        case 'INS':
            caseStudyContent = `<h3>Case Study: Inertial Navigation System</h3>
                               <p>The INS uses a computer and motion sensors to continuously calculate the position, orientation, and velocity of a moving object without the need for external references.</p>`;
            break;
        case 'Acoustic':
            caseStudyContent = `<h3>Case Study: Acoustic Positioning System</h3>
                               <p>Acoustic positioning systems use underwater sound to determine the position of vehicles. The systems employ transponders and other devices to calculate precise locations.</p>`;
            break;
        case 'Hybrid':
            caseStudyContent = `<h3>Case Study: Hybrid Navigation Systems</h3>
                               <p>Hybrid systems combine inertial and acoustic navigation to improve accuracy and reliability, especially in environments where GPS is unavailable.</p>`;
            break;
    }
    document.getElementById('caseStudy').innerHTML = caseStudyContent;
}
