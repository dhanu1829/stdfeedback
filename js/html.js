<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Knowledge Hub - Interactive Learning Portal</title>
    
    <style>
        /* Modern Glassmorphism & Visual Tokens */
        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --secondary: #06b6d4;
            --accent: #f43f5e;
            --bg-dark: #0b0f17;
            --card-glass: rgba(22, 30, 49, 0.75);
            --border-glass: rgba(255, 255, 255, 0.12);
            --text-light: #f8fafc;
            --text-muted: #94a3b8;
            --radius: 16px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-light);
            line-height: 1.6;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* Ambient Animated Background Orbs */
        .glow-orb-1, .glow-orb-2 {
            position: fixed;
            border-radius: 50%;
            filter: blur(90px);
            z-index: -1;
            pointer-events: none;
        }
        .glow-orb-1 {
            width: 350px;
            height: 350px;
            background: rgba(99, 102, 241, 0.25);
            top: -50px;
            left: -50px;
            animation: float 8s ease-in-out infinite alternate;
        }
        .glow-orb-2 {
            width: 450px;
            height: 450px;
            background: rgba(6, 182, 212, 0.2);
            bottom: -100px;
            right: -100px;
            animation: float 10s ease-in-out infinite alternate-reverse;
        }

        @keyframes float {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 40px); }
        }

        /* Navigation Header */
        header {
            background: rgba(11, 15, 23, 0.85);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border-glass);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .navbar {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.2rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.6rem;
            font-weight: 800;
            color: var(--text-light);
            cursor: pointer;
            letter-spacing: -0.5px;
        }

        .logo span { color: var(--secondary); }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 1.2rem;
        }

        .nav-links a {
            color: var(--text-muted);
            text-decoration: none;
            font-weight: 600;
            padding: 0.5rem 0.9rem;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s;
        }

        .nav-links a:hover, .nav-links a.active {
            color: var(--text-light);
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid var(--border-glass);
        }

        /* Main Container & Page Transitions */
        .container {
            max-width: 1200px;
            margin: 2.5rem auto;
            padding: 0 1.5rem;
            flex-grow: 1;
            width: 100%;
        }

        .page-view {
            display: none;
            animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .page-view.active-page {
            display: block;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .page-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }

        .page-subtitle {
            text-align: center;
            color: var(--secondary);
            margin-bottom: 2.5rem;
        }

        /* Layout Grid & Cards */
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.8rem;
        }

        .card {
            background: var(--card-glass);
            border: 1px solid var(--border-glass);
            border-radius: var(--radius);
            padding: 1.8rem;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }

        .card:hover {
            transform: translateY(-6px);
            border-color: rgba(99, 102, 241, 0.4);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
        }

        .card img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 1rem;
        }

        .card-title {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
            color: var(--text-light);
        }

        .card-desc {
            color: var(--text-muted);
            font-size: 0.95rem;
            margin-bottom: 1.2rem;
        }

        /* Interactive Filter Tabs */
        .filter-tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .tab-btn {
            background: var(--card-glass);
            color: var(--text-muted);
            border: 1px solid var(--border-glass);
            padding: 0.6rem 1.2rem;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
            transition: 0.3s;
        }

        .tab-btn.active, .tab-btn:hover {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        /* Buttons */
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 0.8rem 1.6rem;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .btn:hover {
            transform: scale(1.02);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }

        /* Interactive Fee Calculator Widget */
        .calculator-box {
            background: var(--card-glass);
            border: 1px solid var(--border-glass);
            padding: 2rem;
            border-radius: var(--radius);
            margin-top: 3rem;
        }

        /* Accordion FAQ */
        .faq-item {
            background: var(--card-glass);
            border: 1px solid var(--border-glass);
            border-radius: 10px;
            margin-bottom: 1rem;
            overflow: hidden;
        }

        .faq-question {
            padding: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .faq-answer {
            padding: 0 1.2rem 1.2rem 1.2rem;
            color: var(--text-muted);
            display: none;
        }

        /* Forms Styling */
        .form-box {
            background: var(--card-glass);
            border: 1px solid var(--border-glass);
            padding: 2.2rem;
            border-radius: var(--radius);
            max-width: 750px;
            margin: 0 auto;
        }

        .form-group {
            margin-bottom: 1.2rem;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
        }

        label {
            font-size: 0.9rem;
            color: var(--text-muted);
            font-weight: 600;
        }

        input, select, textarea {
            padding: 0.85rem 1rem;
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid var(--border-glass);
            border-radius: 8px;
            color: var(--text-light);
            outline: none;
            transition: 0.3s;
        }

        input:focus, select:focus, textarea:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 1.8rem;
            background: #070a10;
            border-top: 1px solid var(--border-glass);
            color: var(--text-muted);
            font-size: 0.9rem;
            margin-top: auto;
        }

        @media (max-width: 768px) {
            .navbar { flex-direction: column; gap: 1rem; }
        }
    </style>
</head>
<body>

    <div class="glow-orb-1"></div>
    <div class="glow-orb-2"></div>

    <!-- Navigation Bar -->
    <header>
        <nav class="navbar">
            <div class="logo" onclick="switchPage('home')">Knowledge<span>Hub</span></div>
            <ul class="nav-links">
                <li><a id="link-home" onclick="switchPage('home')" class="active">Home</a></li>
                <li><a id="link-about" onclick="switchPage('about')">About</a></li>
                <li><a id="link-courses" onclick="switchPage('courses')">Courses</a></li>
                <li><a id="link-faculty" onclick="switchPage('faculty')">Faculty</a></li>
                <li><a id="link-admissions" onclick="switchPage('admissions')">Admissions</a></li>
                <li><a id="link-contact" onclick="switchPage('contact')">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main class="container">

        <!-- PAGE 1: HOME -->
        <section id="page-home" class="page-view active-page">
            <h1 class="page-title">Knowledge Hub</h1>
            <p class="page-subtitle">Empowering Students Through Next-Gen Education</p>

            <div style="text-align: center; margin-bottom: 3rem;">
                <p style="color: var(--text-muted); max-width: 650px; margin: 0 auto 1.8rem auto;">
                    Interactive learning programs designed to build strong academic fundamentals, practical problem-solving skills, and high board exam scores.
                </p>
                <button onclick="switchPage('admissions')" class="btn">Apply For Admissions 🚀</button>
            </div>

            <!-- Dynamic Fee Estimation Widget -->
            <div class="calculator-box">
                <h3 style="margin-bottom: 1rem; color: var(--secondary);">🧮 Interactive Course Fee Calculator</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div>
                        <label>Select Grade Level:</label>
                        <select id="calc-grade" onchange="calculateFee()">
                            <option value="1000">Class 8 - Class 10 (₹1,000/mo)</option>
                            <option value="1500">Class 11 - Class 12 (₹1,500/mo)</option>
                        </select>
                    </div>
                    <div>
                        <label>Select Subject Count:</label>
                        <select id="calc-subjects" onchange="calculateFee()">
                            <option value="1">1 Subject</option>
                            <option value="2">2 Subjects (10% Off)</option>
                            <option value="3">3+ Subjects (20% Off)</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column; justify-content: center;">
                        <span style="font-size: 0.9rem; color: var(--text-muted);">Estimated Fee:</span>
                        <h2 id="total-fee" style="color: var(--primary);">₹1,000 / month</h2>
                    </div>
                </div>
            </div>
        </section>

        <!-- PAGE 2: ABOUT -->
        <section id="page-about" class="page-view">
            <h1 class="page-title">About Our Institution</h1>
            <p class="page-subtitle">Learn more about our core philosophy</p>

            <div class="card" style="margin-bottom: 2rem;">
                <h3 class="card-title" style="color: var(--secondary);">Our Mission</h3>
                <p class="card-desc">
                    Knowledge Hub Institution is a student-focused learning center dedicated to providing quality education in a supportive and inspiring environment. We help students strengthen their academic skills through digital learning tools, continuous evaluation, and 1-on-1 mentorship.
                </p>
            </div>

            <!-- Interactive Accordion FAQ -->
            <h3 style="margin-bottom: 1rem;">Frequently Asked Questions</h3>
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFaq(this)">
                    <span>What are the class timings?</span> <span>+</span>
                </div>
                <div class="faq-answer">We offer flexible morning (7:00 AM - 8:30 AM) and evening batches (5:00 PM - 8:00 PM).</div>
            </div>
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFaq(this)">
                    <span>Do you offer doubt-clearing sessions?</span> <span>+</span>
                </div>
                <div class="faq-answer">Yes, dedicated 1-on-1 mentorship slots are scheduled every weekend.</div>
            </div>
        </section>

        <!-- PAGE 3: COURSES (With Category Filter) -->
        <section id="page-courses" class="page-view">
            <h1 class="page-title">Academic Courses</h1>
            <p class="page-subtitle">Explore courses customized by class standard</p>

            <!-- Dynamic Course Filter -->
            <div class="filter-tabs">
                <button class="tab-btn active" onclick="filterCourses('all', this)">All Batches</button>
                <button class="tab-btn" onclick="filterCourses('secondary', this)">Secondary (8-10)</button>
                <button class="tab-btn" onclick="filterCourses('higher', this)">Higher Secondary (11-12)</button>
            </div>

            <div class="grid">
                <div class="card course-card" data-category="secondary">
                    <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500&q=80" alt="Maths">
                    <h3 class="card-title"> Mathematics</h3>
                    <p class="card-desc">Algebra, geometry, and board preparation modules for Classes 8 to 10.</p>
                    <button onclick="selectCourseAndEnroll('Secondary Mathematics')" class="btn">Enroll Now</button>
                </div>

                <div class="card course-card" data-category="higher">
                    <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80" alt="Physics">
                    <h3 class="card-title"> Physics</h3>
                    <p class="card-desc">Mechanics, electromagnetism, and practical lab analytical skills.</p>
                    <button onclick="selectCourseAndEnroll('Higher Secondary Physics')" class="btn">Enroll Now</button>
                </div>

                <div class="card course-card" data-category="higher">
                    <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=500&q=80" alt="Chemistry">
                    <h3 class="card-title">Organic  Chemistry</h3>
                    <p class="card-desc">In-depth reaction mechanisms, numerical problem-solving, and periodic trends.</p>
                    <button onclick="selectCourseAndEnroll('Organic & Physical Chemistry')" class="btn">Enroll Now</button>
                </div>
            </div>
        </section>

        <!-- PAGE 4: FACULTY -->
        <section id="page-faculty" class="page-view">
            <h1 class="page-title">Meet Our Experienced Faculty</h1>
            <p class="page-subtitle">Learn from dedicated domain experts</p>

            <div class="grid">
                <div class="card" style="text-align: center;">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Faculty" style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 1rem auto;">
                    <h3 class="card-title">Dr. Sarah Jenkins</h3>
                    <p style="color: var(--secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Head of Mathematics</p>
                    <p class="card-desc">Ph.D. in Applied Mathematics with 12+ years of teaching experience.</p>
                </div>

                <div class="card" style="text-align: center;">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Faculty" style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 1rem auto;">
                    <h3 class="card-title">Prof. Robert Chen</h3>
                    <p style="color: var(--secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Physics Department Head</p>
                    <p class="card-desc">Specialist in numerical physics and competitive entry strategies.</p>
                </div>
            </div>
        </section>

        <!-- PAGE 5: ADMISSIONS -->
        <section id="page-admissions" class="page-view">
            <h1 class="page-title">Admission Form</h1>
            <p class="page-subtitle">Fill in the details below to complete your registration</p>

            <div class="form-box">
                <form id="admissionForm">
                    <div class="form-group">
                        <label for="fullname">Full Name *</label>
                        <input type="text" id="fullname" placeholder="Janani " required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" placeholder="jaanu@gmail.com" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone Number *</label>
                        <input type="tel" id="phone" placeholder="9876543210" pattern="[0-9]{10}" required>
                    </div>

                    <div class="form-group">
                        <label for="grade">Select Class / Grade *</label>
                        <select id="grade" required>
                            <option value="" disabled selected>-- Select Grade --</option>
                            <option value="Class 9">Class 9</option>
                            <option value="Class 10">Class 10</option>
                            <option value="Class 11">Class 11</option>
                            <option value="Class 12">Class 12</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="selectedCourse">Course Selected *</label>
                        <input type="text" id="selectedCourse" placeholder="General Registration" required>
                    </div>

                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea id="address" rows="3" placeholder="Enter residential address"></textarea>
                    </div>

                    <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">Submit Application</button>
                </form>
            </div>
        </section>

        <!-- PAGE 6: CONTACT -->
        <section id="page-contact" class="page-view">
            <h1 class="page-title">Contact Us</h1>
            <p class="page-subtitle">Get in touch with our team</p>

            <div class="grid" style="margin-bottom: 2rem;">
                <div class="card">
                    <h3 class="card-title" style="color: var(--secondary);">Address</h3>
                    <p class="card-desc">Gandhipuram, Coimbatore, Tamil Nadu</p>
                </div>
                <div class="card">
                    <h3 class="card-title" style="color: var(--secondary);">Call Us</h3>
                    <p class="card-desc">+91 98765 43210</p>
                </div>
            </div>

            <div class="form-box">
                <form id="contactForm">
                    <div class="form-group">
                        <label for="cname">Name *</label>
                        <input type="text" id="cname" required>
                    </div>
                    <div class="form-group">
                        <label for="cemail">Email *</label>
                        <input type="email" id="cemail" required>
                    </div>
                    <div class="form-group">
                        <label for="msg">Message *</label>
                        <textarea id="msg" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn">Send Message</button>
                </form>
            </div>
        </section>

    </main>

    <footer>
        <p>&copy; 2026 Knowledge Hub. All Rights Reserved.</p>
    </footer>

    <!-- JavaScript Interactive Scripts -->
    <script>
        // Router Function
        function switchPage(pageId) {
            document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active-page'));
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));

            const targetPage = document.getElementById('page-' + pageId);
            const targetLink = document.getElementById('link-' + pageId);

            if (targetPage) targetPage.classList.add('active-page');
            if (targetLink) targetLink.classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Fee Calculator Logic
        function calculateFee() {
            const baseFee = parseInt(document.getElementById('calc-grade').value);
            const count = parseInt(document.getElementById('calc-subjects').value);
            let discount = 1;

            if (count === 2) discount = 0.9;
            if (count === 3) discount = 0.8;

            const total = Math.round(baseFee * count * discount);
            document.getElementById('total-fee').innerText = `₹${total.toLocaleString()} / month`;
        }

        // Course Tab Filtering Logic
        function filterCourses(category, btnElement) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            btnElement.classList.add('active');

            const cards = document.querySelectorAll('.course-card');
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Direct Course Selection Pre-fill Logic
        function selectCourseAndEnroll(courseName) {
            switchPage('admissions');
            document.getElementById('selectedCourse').value = courseName;
        }

        // Accordion FAQ Toggle
        function toggleFaq(element) {
            const answer = element.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            
            if (!isOpen) {
                answer.style.display = 'block';
            }
        }

        // Local Storage Registration Handler
        document.getElementById('admissionForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const registrationData = {
                fullname: document.getElementById('fullname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                grade: document.getElementById('grade').value,
                course: document.getElementById('selectedCourse').value,
                address: document.getElementById('address').value,
                date: new Date().toLocaleDateString()
            };

            // Store in browser local storage
            let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
            registrations.push(registrationData);
            localStorage.setItem('registrations', JSON.stringify(registrations));

            alert(`🎉 Success! Registration for ${registrationData.fullname} submitted successfully.`);
            this.reset();
        });

        // Contact Form Handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✅ Thank you! Your message has been sent successfully.');
            this.reset();
        });
    </script>
</body>
</html>