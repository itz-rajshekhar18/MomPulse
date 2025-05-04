# MomPulse

## Concept 

#### MomPulse is a comprehensive wellness platform designed to support women through three critical phases of their motherhood journey:

1. Pre-pregnancy (planning and preparation)
2. During pregnancy (health tracking and emotional support)
3. Postpartum (recovery, mental health, and child care guidance)

## Goal

Our goal is to empower mothers with personalized care, emotional support, and medical expertise, all through an easy-to-use digital experience.

## Key Components

#### Web App for Pre & Post Pregnancy:

1. AI Assistant: 24/7 guidance for mental health, nutrition, and lifestyle queries.
2. Zoom Consultations: Scheduled group expert consultations with gynecologists and dieticians.
3. Content Library: Curated articles and videos covering conception tips, emotional well-being, postpartum care, baby care, etc.

#### Mobile App (MVP) for Pregnancy Phase (available on Play Store):

1. Pregnancy Tracker: Week-by-week fetal development tracking.
2. Diet Tracker: Personalized meal plans for pregnant mothers.
3. Health Tracker: Monitor vital signs and symptoms.
4. Fetus 3D Mapping: Visual 3D representation of fetus growth using uploaded ultrasound images.
5. 1:1 Expert Consultation: Direct, private sessions with assigned gynecologists and dieticians.
6. Content Section: Pregnancy-focused articles and videos.

## Why MomPulse?

1. Tailored for Indian mothers, with multilingual support and culturally relevant health and diet guidance.
2. Affordable access to both group and personal expert consultations.
3. Unique integration of AI technology, emotional wellness, and fetal 3D visualization.


## Vision

To make **pregnancy and motherhood safer, happier, and healthier** by offering accessible, expert-backed support to every woman in India.

## AI Assistant Setup

### Dependencies

Make sure you have the following dependencies installed (see `AI_ASSITANT/main.py`):

```
Flask==2.3.2
flask-cors==3.0.10
openai==1.3.7
python-dotenv==1.0.0
```

You can install them with:

```
pip install Flask==2.3.2 flask-cors==3.0.10 openai==1.3.7 python-dotenv==1.0.0
```

### Running the AI Assistant Backend

1. Set your OpenAI API key in a `.env` file:

```
OPENAI_API_KEY=your_openai_api_key_here
```

2. Start the Flask server:

```
cd AI_ASSITANT
python main.py
```

The backend will run on `http://localhost:5000` by default.

