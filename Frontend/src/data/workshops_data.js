import workshop_ml from '/src/assets/workshops_posters/workshop.png';
import workshop_aircraft from '/src/assets/workshops_posters/fighter_aircraft_workshop.png';

export const workshopsData = [
  {
    id: 'ml-foundations',
    title: 'ML Foundations: From Basics to Building Models',
    domain: 'Artificial Intelligence',
    subtitle: 'Organized by Elan & ηVision, Student Body of IIT Hyderabad',
    poster: workshop_ml,
    alt: 'Machine Learning Foundations Workshop Poster',
    dates: '31st Oct & 1st Nov 2026',
    venue: 'IIT Hyderabad Campus',
    unstopUrl: 'https://unstop.com/p/ml-foundations-from-basics-to-building-models-iit-hyderabad-1773767?lb=eWyGjzSO&utm_medium=Share&utm_source=workshops&utm_campaign=Eventsei51134',
    description: 'Step into the world of Artificial Intelligence with an exclusive, hands-on workshop designed to take you from foundational mathematics and Python libraries to training and evaluating real-world predictive models directly on campus.',
    highlights: [
      'Build a strong foundation in core Machine Learning concepts',
      'Gain valuable insights directly from IIT Hyderabad PhD researchers',
      'Receive official certification for all registered participants',
      'Experience campus life with interactive sessions & activities'
    ],
    coordinators: [
      { name: 'Akhil', phone: '9704960508', tel: '+919704960508' },
      { name: 'Tejeswar', phone: '8179771767', tel: '+918179771767' }
    ]
  },
  {
    id: 'fighter-aircraft-design',
    title: '2-Day Fixed Wing Fighter Aircraft Design',
    domain: 'Aerospace & Modelling',
    subtitle: 'Organized by IIT Hyderabad in association with Namoona Aviation',
    poster: workshop_aircraft,
    alt: 'Fixed Wing Fighter Aircraft Design Workshop Poster',
    dates: '31st Oct & 1st Nov 2026',
    venue: 'IIT Hyderabad Campus',
    unstopUrl: 'https://unstop.com/p/fixed-wing-fighter-aircraft-design-a-hands-on-deep-dive-into-sizing-modelling-simulation-and-fly-demo-iit-hyderabad-1773186',
    description: 'A comprehensive, hands-on deep dive into modern fighter aircraft engineering. Learn aeronautical sizing, aerofoil selection, Fusion 360 3D CAD modelling, aerodynamic CFD simulations, avionics electronics, followed by a live flight demo.',
    highlights: [
      'Fixed wing aircraft aerodynamics, configurations and mission sizing',
      'Aerofoil selection & parametric 3D CAD design in Fusion 360',
      'Computational Fluid Dynamics (CFD) simulation with Simscale',
      'Practical hands-on electronics assembly with a live flight demonstration'
    ],
    coordinators: [
      { name: 'Manogna', phone: '9154420779', tel: '+919154420779' },
      { name: 'Tejeswar', phone: '8179771767', tel: '+918179771767' }
    ]
  }
];
