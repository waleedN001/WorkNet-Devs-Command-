import { Lead } from '../types';
import { SALON_LEADS_PART2 } from './salonLeadsData2';

const SALON_LEADS_PART1: Lead[] = [
  // GERMANY
  {
    id: 'lead-salon-de-01',
    business_name: 'Shan Rahimkhan Coiffure & Beauty',
    website_link: 'https://shanrahimkhan.de',
    business_industry: 'Hair Dresser & Luxury Salon',
    target_area: 'Berlin, Germany',
    country: 'Germany',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/shanrahimkhan.coiffure' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/shan-rahimkhan' },
      instagram: { exists: true, url: 'https://instagram.com/shanrahimkhanberlin' },
      yelp: { exists: true, url: 'https://yelp.de/biz/shan-rahimkhan-berlin' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=91029384' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/shanrahimkhan.de' }
    },
    contact: {
      physical_address: 'Markgrafenstraße 36, 10117 Berlin, Germany',
      contact_number: '+49 30 2067890',
      email: 'salon@shanrahimkhan.de',
      vat_number: 'DE283920194'
    },
    personnel: {
      owner_details: 'Shan Rahimkhan (Founder & Master Stylist)',
      manager_details: 'Katharina Richter (Salon Director)',
      responsible_person: 'Katharina Richter'
    },
    intelligence: {
      key_context: 'Premier Berlin luxury hair salon and aesthetic spa located at Gendarmenmarkt.',
      key_strategy: 'Transitioning from phone bookings to automated VIP client retention app.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 2005,
      major_revision_year: 2024,
      vision_mission: 'Redefining European high-fashion hair styling and holistic organic hair care.'
    },
    metrics: {
      customer_reviews: '4.8/5 (340 Google reviews)',
      business_system_rating: '6.5/10 - Manual phone booking & weekend queue bottleneck',
      system_remark: 'High footfall and high average ticket size, but loses ~18% after-hours web inquiries.'
    },
    current_phase: 1,
    status: 'Discovered',
    last_contact_date: '2026-07-21',
    notes: 'High commercial intent lead matching "Hair Dresser Salon Berlin".',
    regional_data_source: 'Loqate / Bundesanzeiger',
    score: 95
  },
  {
    id: 'lead-salon-de-02',
    business_name: 'Hautkultur Aesthetic & Skincare Center',
    website_link: 'https://hautkultur-frankfurt.de',
    business_industry: 'Medical Skincare & Dermatology',
    target_area: 'Frankfurt, Germany',
    country: 'Germany',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/hautkultur.frankfurt' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/hautkultur-skin' },
      instagram: { exists: true, url: 'https://instagram.com/hautkultur_frankfurt' },
      yelp: { exists: false, url: '' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=88129302' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/hautkultur-frankfurt.de' }
    },
    contact: {
      physical_address: 'Goethestraße 22, 60313 Frankfurt am Main, Germany',
      contact_number: '+49 69 9200380',
      email: 'praxis@hautkultur-frankfurt.de',
      vat_number: 'DE301928405'
    },
    personnel: {
      owner_details: 'Dr. med. Stefan Lindner (Medical Director)',
      manager_details: 'Svenja Meier (Practice Manager)',
      responsible_person: 'Svenja Meier'
    },
    intelligence: {
      key_context: 'Bespoke clinical dermatology, anti-aging laser therapy, and HydraFacial clinic.',
      key_strategy: 'Scaling premium recurring membership packages for banking executives.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 2012,
      major_revision_year: 2025,
      vision_mission: 'Combining clinical precision with five-star luxury skincare experiences.'
    },
    metrics: {
      customer_reviews: '4.9/5 (210 Google reviews)',
      business_system_rating: '7.2/10 - Lacks automated treatment follow-up sequence',
      system_remark: 'Strong client satisfaction but no automated re-booking sequences for 30-day dermal cycles.'
    },
    current_phase: 2,
    status: 'Phase 2: Initial Email Sent',
    last_contact_date: '2026-07-21',
    notes: 'Initial Assessment Report emailed regarding automated HydraFacial re-engagement campaign.',
    regional_data_source: 'Bundesanzeiger / Gelbe Seiten',
    score: 93
  },
  {
    id: 'lead-salon-de-03',
    business_name: 'Marlies Möller Beauty Hair Salon',
    website_link: 'https://marliesmoeller.de',
    business_industry: 'Hair Dresser & Luxury Beauty Parlor',
    target_area: 'Hamburg, Germany',
    country: 'Germany',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/marliesmoellerhamburg' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/marlies-moeller' },
      instagram: { exists: true, url: 'https://instagram.com/marliesmoeller_official' },
      yelp: { exists: true, url: 'https://yelp.de/biz/marlies-möller-hamburg' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=77120394' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/marliesmoeller.de' }
    },
    contact: {
      physical_address: 'Neuer Wall 44, 20354 Hamburg, Germany',
      contact_number: '+49 40 351020',
      email: 'hamburg@marliesmoeller.de',
      vat_number: 'DE118293847'
    },
    personnel: {
      owner_details: 'Christian Möller (Managing Director)',
      manager_details: 'Anja Vogel (Head Stylist & Salon Ops)',
      responsible_person: 'Anja Vogel'
    },
    intelligence: {
      key_context: 'Iconic German hair couture brand with flagship salon in Neuer Wall Hamburg.',
      key_strategy: 'Expanding online product sales alongside flagship salon appointment scheduling.',
      annual_revenue: '$10M+',
      business_scale: 'Large',
      establishment_year: 1962,
      major_revision_year: 2023,
      vision_mission: 'Passionate dry-cutting artistry and premium luxury hair care systems.'
    },
    metrics: {
      customer_reviews: '4.7/5 (480 reviews)',
      business_system_rating: '6.8/10 - Separate booking system for hair vs spa treatments',
      system_remark: 'Requires unified cross-selling engine between retail product buyers and salon appointments.'
    },
    current_phase: 3,
    status: 'Phase 3: Deliverable Shared',
    last_contact_date: '2026-07-20',
    notes: 'Custom 30-Day Growth Deliverable shared for cross-selling salon retail with online bookings.',
    regional_data_source: 'Loqate / Handelsregister',
    score: 96
  },
  {
    id: 'lead-salon-de-04',
    business_name: 'Couture Hair & Spa Studio',
    website_link: 'https://couturehair-munich.de',
    business_industry: 'Hair Dresser & Organic Scalp Care',
    target_area: 'Munich, Germany',
    country: 'Germany',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/couturehairmunich' },
      linkedin: { exists: false, url: '' },
      instagram: { exists: true, url: 'https://instagram.com/couturehair_muc' },
      yelp: { exists: true, url: 'https://yelp.de/biz/couture-hair-münchen' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=66102938' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Maximilianstraße 14, 80539 München, Germany',
      contact_number: '+49 89 2109820',
      email: 'servus@couturehair-munich.de',
      vat_number: 'DE298102938'
    },
    personnel: {
      owner_details: 'Maximilian Bauer (Founder)',
      manager_details: 'Elena Schwarz (Lead Colorist)',
      responsible_person: 'Maximilian Bauer'
    },
    intelligence: {
      key_context: 'High-end Balayage and Japanese Scalp Head Spa studio in Munich city center.',
      key_strategy: 'Introducing VIP membership subscriptions for monthly scalp treatments.',
      annual_revenue: '$500K - $2M',
      business_scale: 'Small',
      establishment_year: 2017,
      major_revision_year: 2025,
      vision_mission: 'Combining haute-couture hair artistry with holistic Japanese scalp relaxation.'
    },
    metrics: {
      customer_reviews: '4.9/5 (190 Google reviews)',
      business_system_rating: '5.9/10 - Instagram DM booking overhead',
      system_remark: 'Overwhelmed by manual Instagram DMs; needs automated WhatsApp/Web booking widget.'
    },
    current_phase: 4,
    status: 'Phase 4: Growth Blueprint Delivered',
    last_contact_date: '2026-07-19',
    notes: 'Growth Blueprint delivered showing 35% time savings with AI automated WhatsApp booking widget.',
    regional_data_source: 'Loqate / Gelbe Seiten',
    score: 91
  },
  {
    id: 'lead-salon-de-05',
    business_name: 'Atelier de Beauté & Skincare Lounge',
    website_link: 'https://atelierdebeaute-koeln.de',
    business_industry: 'Beauty Parlor & Facial Spa',
    target_area: 'Cologne, Germany',
    country: 'Germany',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/atelierbeaute.koeln' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/atelier-de-beaute-koeln' },
      instagram: { exists: true, url: 'https://instagram.com/atelierbeaute_koeln' },
      yelp: { exists: false, url: '' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=55192837' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/atelierdebeaute-koeln.de' }
    },
    contact: {
      physical_address: 'Mittelstraße 12, 50672 Köln, Germany',
      contact_number: '+49 221 492019',
      email: 'hello@atelierdebeaute-koeln.de',
      vat_number: 'DE312938471'
    },
    personnel: {
      owner_details: 'Monika Schmitz (Owner & Master Esthetician)',
      manager_details: 'Julia Weber (Operations Manager)',
      responsible_person: 'Monika Schmitz'
    },
    intelligence: {
      key_context: 'Boutique organic skincare studio offering custom facials and anti-aging treatments.',
      key_strategy: 'Automating customer review generation to top local search pack.',
      annual_revenue: '$500K - $2M',
      business_scale: 'Small',
      establishment_year: 2016,
      major_revision_year: 2024,
      vision_mission: 'Natural beauty enhancement through biocompatible skincare formulation.'
    },
    metrics: {
      customer_reviews: '4.8/5 (155 Google reviews)',
      business_system_rating: '6.4/10 - Manual SMS reminders',
      system_remark: 'Lacks automated post-treatment care emails and Google review request triggers.'
    },
    current_phase: 5,
    status: 'Phase 5: Proposal & Demo Invite',
    last_contact_date: '2026-07-21',
    notes: 'Demo invitation sent for auto-review engine and smart calendar sync.',
    regional_data_source: 'Gelbe Seiten / Bundesanzeiger',
    score: 89
  },

  // FRANCE
  {
    id: 'lead-salon-fr-06',
    business_name: 'Maison de Beauté Carita',
    website_link: 'https://carita.fr',
    business_industry: 'Luxury Beauty Parlor & Aesthetics',
    target_area: 'Paris, France',
    country: 'France',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/caritaparis' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/maison-carita' },
      instagram: { exists: true, url: 'https://instagram.com/caritaparis' },
      yelp: { exists: true, url: 'https://yelp.fr/biz/maison-de-beauté-carita-paris' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=11029384' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/carita.fr' }
    },
    contact: {
      physical_address: '11 Rue du Faubourg Saint-Honoré, 75008 Paris, France',
      contact_number: '+33 1 44 94 11 11',
      email: 'faubourg@carita.fr',
      vat_number: 'FR82392019284'
    },
    personnel: {
      owner_details: 'L’Oréal Luxe Division (Parent Company)',
      manager_details: 'Isabelle Moreau (General Manager)',
      responsible_person: 'Isabelle Moreau'
    },
    intelligence: {
      key_context: 'Historical 5-floor Paris haute-beauté institute offering luxury facials and spa treatments.',
      key_strategy: 'Digitalizing VIP concierge reservations for international clientele.',
      annual_revenue: '$10M+',
      business_scale: 'Enterprise',
      establishment_year: 1952,
      major_revision_year: 2022,
      vision_mission: 'The ultimate Parisian sanctuary for haute transformation and skin youthfulness.'
    },
    metrics: {
      customer_reviews: '4.8/5 (410 Google reviews)',
      business_system_rating: '7.5/10 - High brand equity, complex manual VIP booking desk',
      system_remark: 'Needs multi-lingual AI concierge for international luxury guests.'
    },
    current_phase: 6,
    status: 'Phase 6: Monthly Scaling Nurture',
    last_contact_date: '2026-07-18',
    notes: 'Nurture sequence active targeting multi-lingual VIP concierge web widgets.',
    regional_data_source: 'Amadeus / Infogreffe',
    score: 98
  },
  {
    id: 'lead-salon-fr-07',
    business_name: 'Christophe Robin Hair Lounge',
    website_link: 'https://christopherobin.fr',
    business_industry: 'Hair Dresser & Color Specialist',
    target_area: 'Paris, France',
    country: 'France',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/christopherobinparis' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/christophe-robin' },
      instagram: { exists: true, url: 'https://instagram.com/christopherobinparis' },
      yelp: { exists: true, url: 'https://yelp.fr/biz/christophe-robin-paris' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=99281029' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/christopherobin.fr' }
    },
    contact: {
      physical_address: '16 Rue Bachaumont, 75002 Paris, France',
      contact_number: '+33 1 40 20 02 83',
      email: 'salon@christopherobin.fr',
      vat_number: 'FR91029384756'
    },
    personnel: {
      owner_details: 'Christophe Robin (Founder)',
      manager_details: 'Antoine Petit (Salon Manager)',
      responsible_person: 'Antoine Petit'
    },
    intelligence: {
      key_context: 'World-renowned hair coloring atelier in the heart of Montorgueil Paris.',
      key_strategy: 'Boosting hair treatment package pre-orders and subscription hair detox treatments.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 1999,
      major_revision_year: 2024,
      vision_mission: 'Restoring scalp harmony and natural hair vitality through botanical formulas.'
    },
    metrics: {
      customer_reviews: '4.7/5 (280 reviews)',
      business_system_rating: '6.9/10 - High phone inquiry load',
      system_remark: 'Receptionist handles ~60 phone calls daily for routine pricing inquiries.'
    },
    current_phase: 7,
    status: 'Phase 7: Multi-Channel Outreach',
    last_contact_date: '2026-07-20',
    notes: 'LinkedIn & Email outreach active targeting salon operational efficiency.',
    regional_data_source: 'Infogreffe / Kompass France',
    score: 94
  },
  {
    id: 'lead-salon-fr-08',
    business_name: 'Biologique Recherche Ambassade de Beauté',
    website_link: 'https://biologique-recherche.com',
    business_industry: 'High-End Skincare Center & Dermacare',
    target_area: 'Paris, France',
    country: 'France',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/biologiquerechercheparis' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/biologique-recherche' },
      instagram: { exists: true, url: 'https://instagram.com/biologique_recherche' },
      yelp: { exists: true, url: 'https://yelp.fr/biz/biologique-recherche-paris' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=77192834' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/biologique-recherche.com' }
    },
    contact: {
      physical_address: '32 Avenue des Champs-Élysées, 75008 Paris, France',
      contact_number: '+33 1 42 25 02 92',
      email: 'champselysees@biologique-recherche.com',
      vat_number: 'FR19283746501'
    },
    personnel: {
      owner_details: 'Dr. Philippe Allouche (Co-Owner)',
      manager_details: 'Valérie Blanc (Ambassade Director)',
      responsible_person: 'Valérie Blanc'
    },
    intelligence: {
      key_context: 'Cult-favorite medical skincare institute famous for Lotion P50 and skin diagnostics.',
      key_strategy: 'Implementing digital Skin Instant Lab diagnostic booking integration on website.',
      annual_revenue: '$10M+',
      business_scale: 'Large',
      establishment_year: 1978,
      major_revision_year: 2025,
      vision_mission: 'Clinical custom skincare tailored strictly to individual skin state hyper-customization.'
    },
    metrics: {
      customer_reviews: '4.9/5 (520 Google reviews)',
      business_system_rating: '8.1/10 - High demand, 3-month waiting list',
      system_remark: 'Needs waitlist automation tool to fill last-minute cancellation slots instantly.'
    },
    current_phase: 8,
    status: 'Phase 8: New Value Shared',
    last_contact_date: '2026-07-21',
    notes: 'Shared automated waitlist filling case study showing +€14,000 monthly recovered revenues.',
    regional_data_source: 'Amadeus / Infogreffe',
    score: 99
  },
  {
    id: 'lead-salon-fr-09',
    business_name: 'Studio Harcourt Skincare & Glow Lounge',
    website_link: 'https://studio-harcourt-beauty.fr',
    business_industry: 'Beauty Parlor & Facial Spa',
    target_area: 'Lyon, France',
    country: 'France',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/harcourtbeauty.lyon' },
      linkedin: { exists: false, url: '' },
      instagram: { exists: true, url: 'https://instagram.com/studioharcourt_beauty' },
      yelp: { exists: false, url: '' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=44102938' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: '14 Rue Grolée, 69002 Lyon, France',
      contact_number: '+33 4 72 40 92 10',
      email: 'contact@harcourt-beauty.fr',
      vat_number: 'FR40293847510'
    },
    personnel: {
      owner_details: 'Camille Reynaud (Founder & Esthetician)',
      manager_details: 'Lucas Dupont (Operations Manager)',
      responsible_person: 'Camille Reynaud'
    },
    intelligence: {
      key_context: 'Boutique facial bar specializing in microcurrent face lifting and LED light therapy in Lyon.',
      key_strategy: 'Automating local Google Maps SEO and review capture.',
      annual_revenue: '$500K - $2M',
      business_scale: 'Small',
      establishment_year: 2020,
      major_revision_year: 2024,
      vision_mission: 'Instant camera-ready facial glow through non-invasive cellular activation.'
    },
    metrics: {
      customer_reviews: '4.8/5 (130 reviews)',
      business_system_rating: '5.8/10 - Manual booking via phone',
      system_remark: 'No online booking engine embedded on Instagram bio or website.'
    },
    current_phase: 1,
    status: 'Discovered',
    last_contact_date: '2026-07-21',
    notes: 'Identified via PagesJaunes France dataset.',
    regional_data_source: 'Kompass / PagesJaunes',
    score: 87
  },
  {
    id: 'lead-salon-fr-10',
    business_name: 'Riviera Hair & Spa Resort Studio',
    website_link: 'https://rivierahair-nice.fr',
    business_industry: 'Hair Dresser & Luxury Beauty Spa',
    target_area: 'Nice, France',
    country: 'France',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/rivierahairnice' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/riviera-hair-nice' },
      instagram: { exists: true, url: 'https://instagram.com/rivierahair_nice' },
      yelp: { exists: true, url: 'https://yelp.fr/biz/riviera-hair-nice' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=33192847' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/rivierahair-nice.fr' }
    },
    contact: {
      physical_address: '25 Promenade des Anglais, 06000 Nice, France',
      contact_number: '+33 4 93 88 12 00',
      email: 'nice@rivierahair-nice.fr',
      vat_number: 'FR55928374102'
    },
    personnel: {
      owner_details: 'Jean-Luc Marchand (Owner)',
      manager_details: 'Sophie Martin (Spa Director)',
      responsible_person: 'Sophie Martin'
    },
    intelligence: {
      key_context: 'Beachfront luxury hair styling and thalasso spa salon serving French Riviera elites.',
      key_strategy: 'Targeting yacht charter guests and luxury hotel tourists with geo-fenced promo packages.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 2011,
      major_revision_year: 2025,
      vision_mission: 'Effortless French Riviera glamour combined with restorative sea-mineral hair rituals.'
    },
    metrics: {
      customer_reviews: '4.7/5 (210 reviews)',
      business_system_rating: '6.3/10 - Seasonal revenue fluctuations',
      system_remark: 'Needs off-season local resident membership drive automation.'
    },
    current_phase: 2,
    status: 'Phase 2: Initial Email Sent',
    last_contact_date: '2026-07-21',
    notes: 'Outreach email sent regarding seasonal retention automation.',
    regional_data_source: 'Infogreffe / Sirene',
    score: 90
  },

  // ITALY
  {
    id: 'lead-salon-it-11',
    business_name: 'Aldo Coppola Kingdom Hair Studio',
    website_link: 'https://aldocoppola.com',
    business_industry: 'Hair Dresser & Fashion Styling',
    target_area: 'Milan, Italy',
    country: 'Italy',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/aldocoppolaofficial' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/aldo-coppola' },
      instagram: { exists: true, url: 'https://instagram.com/aldocoppola' },
      yelp: { exists: true, url: 'https://yelp.it/biz/aldo-coppola-milano' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=10293847' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/aldocoppola.com' }
    },
    contact: {
      physical_address: 'Corso Matteotti 7, 20121 Milano, Italy',
      contact_number: '+39 02 76280558',
      email: 'kingdom@aldocoppola.com',
      vat_number: 'IT08192039182'
    },
    personnel: {
      owner_details: 'Aldo Coppola Jr. (CEO)',
      manager_details: 'Federica Romano (Salon Manager)',
      responsible_person: 'Federica Romano'
    },
    intelligence: {
      key_context: 'Milan’s most prestigious hair salon brand during Milan Fashion Week.',
      key_strategy: 'Automating VIP client booking and natural henna color treatment packages.',
      annual_revenue: '$10M+',
      business_scale: 'Large',
      establishment_year: 1965,
      major_revision_year: 2024,
      vision_mission: 'Italian hair design elegance, holistic hair health, and innovative trend-setting.'
    },
    metrics: {
      customer_reviews: '4.8/5 (620 Google reviews)',
      business_system_rating: '7.8/10 - High volume, phone call bottlenecks during fashion weeks',
      system_remark: 'Requires AI assistant to handle instant WhatsApp appointment modifications.'
    },
    current_phase: 9,
    status: 'Phase 9: Competitor Analysis Sent',
    last_contact_date: '2026-07-20',
    notes: 'Competitor analysis sent comparing Milan fashion week salon automation tech stacks.',
    regional_data_source: 'Registro Imprese / Cerved',
    score: 97
  },
  {
    id: 'lead-salon-it-12',
    business_name: 'Orazio Anelli Hair Concept',
    website_link: 'https://orazioanelli.it',
    business_industry: 'Hair Dresser & Color Bar',
    target_area: 'Rome, Italy',
    country: 'Italy',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/orazioanellihair' },
      linkedin: { exists: false, url: '' },
      instagram: { exists: true, url: 'https://instagram.com/orazioanelli_roma' },
      yelp: { exists: true, url: 'https://yelp.it/biz/orazio-anelli-roma' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=99102938' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Via Borgognona 42, 00187 Roma, Italy',
      contact_number: '+39 06 6791200',
      email: 'info@orazioanelli.it',
      vat_number: 'IT09283741029'
    },
    personnel: {
      owner_details: 'Orazio Anelli (Founder & Creative Director)',
      manager_details: 'Chiara Rossi (Salon Coordinator)',
      responsible_person: 'Chiara Rossi'
    },
    intelligence: {
      key_context: 'Luxury salon near Piazza di Spagna in Rome specializing in custom blonde balayage.',
      key_strategy: 'Setting up automated SMS appointment reminders to eliminate 15% no-show rate.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 2002,
      major_revision_year: 2024,
      vision_mission: 'Bespoke Roman hair artistry elevating natural female beauty.'
    },
    metrics: {
      customer_reviews: '4.7/5 (290 reviews)',
      business_system_rating: '6.1/10 - High no-show rate during peak tourist season',
      system_remark: 'Needs pre-payment deposit capture for international clients.'
    },
    current_phase: 3,
    status: 'Phase 3: Deliverable Shared',
    last_contact_date: '2026-07-21',
    notes: 'Shared deposit pre-authorization flow design document.',
    regional_data_source: 'Pagine Gialle / Registro Imprese',
    score: 92
  },
  {
    id: 'lead-salon-it-13',
    business_name: 'Spazio Rossano Ferretti Beauty Lounge',
    website_link: 'https://rossanoferretti.com',
    business_industry: 'Luxury Beauty Parlor & Hair Spa',
    target_area: 'Florence, Italy',
    country: 'Italy',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/rossanoferrettiofficial' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/rossano-ferretti' },
      instagram: { exists: true, url: 'https://instagram.com/rossanoferrettiofficial' },
      yelp: { exists: true, url: 'https://yelp.it/biz/rossano-ferretti-firenze' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=88291029' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/rossanoferretti.com' }
    },
    contact: {
      physical_address: 'Borgo Pinti 99, 50121 Firenze, Italy',
      contact_number: '+39 055 26261',
      email: 'firenze@rossanoferretti.com',
      vat_number: 'IT07192039102'
    },
    personnel: {
      owner_details: 'Rossano Ferretti (Founder)',
      manager_details: 'Matteo Bianchi (Hair Spa Director)',
      responsible_person: 'Matteo Bianchi'
    },
    intelligence: {
      key_context: 'Located inside Four Seasons Florence, pioneering the Invisible Haircut technique.',
      key_strategy: 'Integrating hotel concierge software with direct salon booking engine.',
      annual_revenue: '$10M+',
      business_scale: 'Large',
      establishment_year: 1990,
      major_revision_year: 2025,
      vision_mission: 'Enhancing individual natural hair movement without artificial weight.'
    },
    metrics: {
      customer_reviews: '4.9/5 (380 reviews)',
      business_system_rating: '8.0/10 - Excellent service, manual hotel guest synchronization',
      system_remark: 'Hotel front desk makes manual calls to book guests into salon schedule.'
    },
    current_phase: 10,
    status: 'Phase 10: Industry News Alert',
    last_contact_date: '2026-07-21',
    notes: 'Sent automated luxury hotel-salon software sync news alert.',
    regional_data_source: 'Cerved / Registro Imprese',
    score: 98
  },
  {
    id: 'lead-salon-it-14',
    business_name: 'Skin Medical Aesthetic Clinic',
    website_link: 'https://skinmedical-torino.it',
    business_industry: 'Medical Skincare & Laser Center',
    target_area: 'Turin, Italy',
    country: 'Italy',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/skinmedicaltorino' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/skin-medical-torino' },
      instagram: { exists: true, url: 'https://instagram.com/skinmedical_torino' },
      yelp: { exists: false, url: '' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=55102938' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Via Roma 320, 10121 Torino, Italy',
      contact_number: '+39 011 562019',
      email: 'segreteria@skinmedical-torino.it',
      vat_number: 'IT06192837410'
    },
    personnel: {
      owner_details: 'Dr. Gianluca Moretti (Medical Director)',
      manager_details: 'Elena Ferrero (Clinical Operations)',
      responsible_person: 'Elena Ferrero'
    },
    intelligence: {
      key_context: 'Non-surgical aesthetic medicine, laser hair removal, and skin rejuvenation center.',
      key_strategy: 'Launching multi-session package subscription billing model.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 2014,
      major_revision_year: 2024,
      vision_mission: 'Scientific skin restoration and evidence-based non-surgical aesthetics.'
    },
    metrics: {
      customer_reviews: '4.8/5 (190 reviews)',
      business_system_rating: '6.7/10 - Manual medical intake forms on paper',
      system_remark: 'Lacks digital GDPR compliant pre-consultation intake forms on tablet/mobile.'
    },
    current_phase: 4,
    status: 'Phase 4: Growth Blueprint Delivered',
    last_contact_date: '2026-07-19',
    notes: 'GDPR digital intake blueprint delivered to Dr. Moretti.',
    regional_data_source: 'Pagine Gialle / Cerved',
    score: 91
  },
  {
    id: 'lead-salon-it-15',
    business_name: 'Beauty Spa & Wellness Lido',
    website_link: 'https://beautyspa-venezia.it',
    business_industry: 'Beauty Parlor & Skincare',
    target_area: 'Venice, Italy',
    country: 'Italy',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/beautyspavenetia' },
      linkedin: { exists: false, url: '' },
      instagram: { exists: true, url: 'https://instagram.com/beautyspa_venezia' },
      yelp: { exists: true, url: 'https://yelp.it/biz/beauty-spa-lido-venezia' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=11203948' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Gran Viale Santa Maria Elisabetta 12, 30126 Venezia Lido, Italy',
      contact_number: '+39 041 5260192',
      email: 'info@beautyspa-venezia.it',
      vat_number: 'IT04192039182'
    },
    personnel: {
      owner_details: 'Lucia Contarini (Founder)',
      manager_details: 'Marco Grimani (Spa Manager)',
      responsible_person: 'Lucia Contarini'
    },
    intelligence: {
      key_context: 'Lagoon wellness studio providing organic facial therapy and luxury body treatments.',
      key_strategy: 'Automating Google reviews from Venice Film Festival celebrity guests.',
      annual_revenue: '$500K - $2M',
      business_scale: 'Small',
      establishment_year: 2010,
      major_revision_year: 2023,
      vision_mission: 'Venetian thermal water remedies and botanical skincare balance.'
    },
    metrics: {
      customer_reviews: '4.6/5 (120 reviews)',
      business_system_rating: '5.5/10 - No automated customer follow-up',
      system_remark: 'Does not capture visitor emails for post-vacation e-commerce product sales.'
    },
    current_phase: 1,
    status: 'Discovered',
    last_contact_date: '2026-07-21',
    notes: 'Identified via Italian business directory.',
    regional_data_source: 'Pagine Gialle',
    score: 85
  },

  // SPAIN
  {
    id: 'lead-salon-es-16',
    business_name: 'TACHA Beauty & Medical Skincare',
    website_link: 'https://tacha.es',
    business_industry: 'Medical Skincare & Beauty Parlor',
    target_area: 'Madrid, Spain',
    country: 'Spain',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/tachabeauty' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/tacha-beauty' },
      instagram: { exists: true, url: 'https://instagram.com/tachabeauty' },
      yelp: { exists: true, url: 'https://yelp.es/biz/tacha-beauty-madrid' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=88102938' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/tacha.es' }
    },
    contact: {
      physical_address: 'Calle de Castelló 60, 28001 Madrid, Spain',
      contact_number: '+34 91 5612433',
      email: 'castello@tacha.es',
      vat_number: 'ESB81920391'
    },
    personnel: {
      owner_details: 'Natalia de la Vega (Founder & CEO)',
      manager_details: 'Carmen Morales (Director of Operations)',
      responsible_person: 'Carmen Morales'
    },
    intelligence: {
      key_context: 'Spain’s premier celebrity beauty center combining hair, skincare, and medical aesthetics.',
      key_strategy: 'Launching automated VIP membership subscription portal.',
      annual_revenue: '$10M+',
      business_scale: 'Large',
      establishment_year: 1994,
      major_revision_year: 2025,
      vision_mission: 'Holistic 360-degree transformation combining cutting-edge science and luxury relaxation.'
    },
    metrics: {
      customer_reviews: '4.8/5 (450 Google reviews)',
      business_system_rating: '8.2/10 - High brand presence, requires multi-branch CRM',
      system_remark: '3 branches in Madrid & Marbella need centralized lead distribution engine.'
    },
    current_phase: 5,
    status: 'Phase 5: Proposal & Demo Invite',
    last_contact_date: '2026-07-21',
    notes: 'Demo booked invite sent to Natalia de la Vega.',
    regional_data_source: 'Camerdata / SABI',
    score: 97
  },
  {
    id: 'lead-salon-es-17',
    business_name: 'Salon Toro Hair Lounge',
    website_link: 'https://salontoro.com',
    business_industry: 'Hair Dresser & Scalp Therapy',
    target_area: 'Barcelona, Spain',
    country: 'Spain',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/salontorobarcelona' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/salon-toro' },
      instagram: { exists: true, url: 'https://instagram.com/salontoro' },
      yelp: { exists: true, url: 'https://yelp.es/biz/salon-toro-barcelona' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=77102938' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/salontoro.com' }
    },
    contact: {
      physical_address: 'Passeig de Gràcia 63, 08008 Barcelona, Spain',
      contact_number: '+34 93 4874132',
      email: 'pgracia@salontoro.com',
      vat_number: 'ESB60192837'
    },
    personnel: {
      owner_details: 'Víctor Toro (Creative Director)',
      manager_details: 'Marta Soler (Salon Manager)',
      responsible_person: 'Marta Soler'
    },
    intelligence: {
      key_context: 'High-end hair fashion salon on Passeig de Gràcia serving international clientele.',
      key_strategy: 'Automating multi-lingual booking widget (Spanish, English, French, Russian).',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 1998,
      major_revision_year: 2024,
      vision_mission: 'Avant-garde Mediterranean hair styling with bespoke color formulation.'
    },
    metrics: {
      customer_reviews: '4.7/5 (320 reviews)',
      business_system_rating: '7.0/10 - High web traffic, booking form drop-offs',
      system_remark: 'Lacks instant WhatsApp confirmation bot for tourists.'
    },
    current_phase: 2,
    status: 'Phase 2: Initial Email Sent',
    last_contact_date: '2026-07-21',
    notes: 'Initial Assessment email sent focusing on multi-lingual WhatsApp booking conversion.',
    regional_data_source: 'Camerdata / SABI',
    score: 93
  },
  {
    id: 'lead-salon-es-18',
    business_name: 'Backstage Beauty & Lash Lounge',
    website_link: 'https://backstagevalencia.es',
    business_industry: 'Beauty Parlor & Aesthetics',
    target_area: 'Valencia, Spain',
    country: 'Spain',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/backstagevalencia' },
      linkedin: { exists: false, url: '' },
      instagram: { exists: true, url: 'https://instagram.com/backstage_valencia' },
      yelp: { exists: false, url: '' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=44192038' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Carrer de Colon 18, 46004 Valencia, Spain',
      contact_number: '+34 96 3520192',
      email: 'hola@backstagevalencia.es',
      vat_number: 'ESB98102938'
    },
    personnel: {
      owner_details: 'Laura Ibáñez (Founder)',
      manager_details: 'Rocío Navarro (Lead Technician)',
      responsible_person: 'Laura Ibáñez'
    },
    intelligence: {
      key_context: 'Specialized lash extensions, microblading, and instant glow facials in Valencia.',
      key_strategy: 'Reducing appointment cancellations with automated SMS pre-notifications.',
      annual_revenue: '$500K - $2M',
      business_scale: 'Small',
      establishment_year: 2018,
      major_revision_year: 2024,
      vision_mission: 'Precision lash and brow enhancement engineered for modern women.'
    },
    metrics: {
      customer_reviews: '4.9/5 (210 reviews)',
      business_system_rating: '6.0/10 - Manual Instagram scheduling',
      system_remark: 'Owner spends 2 hours every evening manually confirming Instagram appointments.'
    },
    current_phase: 1,
    status: 'Discovered',
    last_contact_date: '2026-07-21',
    notes: 'Discovered via Páginas Amarillas Valencia search.',
    regional_data_source: 'Páginas Amarillas / Camerdata',
    score: 88
  },
  {
    id: 'lead-salon-es-19',
    business_name: 'Maison de Beauté Luxury Spa',
    website_link: 'https://maisondebeaute-marbella.com',
    business_industry: 'High-End Skincare & Wellness',
    target_area: 'Marbella, Spain',
    country: 'Spain',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/maisonbeautemarbella' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/maison-beaute-marbella' },
      instagram: { exists: true, url: 'https://instagram.com/maisondebeaute_marbella' },
      yelp: { exists: true, url: 'https://yelp.es/biz/maison-de-beauté-marbella' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=99102934' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/maisondebeaute-marbella.com' }
    },
    contact: {
      physical_address: 'Bulevar Príncipe Alfonso de Hohenlohe, 29602 Marbella, Spain',
      contact_number: '+34 95 2820192',
      email: 'info@maisondebeaute-marbella.com',
      vat_number: 'ESB29102938'
    },
    personnel: {
      owner_details: 'Elena Vance (Founder)',
      manager_details: 'Carlos de la Rosa (Spa Manager)',
      responsible_person: 'Carlos de la Rosa'
    },
    intelligence: {
      key_context: 'Golden Mile Marbella beauty clinic serving high-net-worth international residents.',
      key_strategy: 'Automating high-ticket package sales and VIP home care product subscriptions.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 2013,
      major_revision_year: 2025,
      vision_mission: 'Ultra-exclusive anti-aging treatments and Mediterranean ocean wellness.'
    },
    metrics: {
      customer_reviews: '4.9/5 (180 reviews)',
      business_system_rating: '7.4/10 - Good local reputation, manual concierge handling',
      system_remark: 'Needs VIP automated calendar reservation for private villa visits.'
    },
    current_phase: 6,
    status: 'Phase 6: Monthly Scaling Nurture',
    last_contact_date: '2026-07-19',
    notes: 'Active monthly nurture campaign for private villa concierge plugin.',
    regional_data_source: 'Camerdata / SABI',
    score: 94
  },
  {
    id: 'lead-salon-es-20',
    business_name: 'Seville Organic Hair & Skin Concept',
    website_link: 'https://organichair-sevilla.es',
    business_industry: 'Organic Hair Salon & Facial Studio',
    target_area: 'Seville, Spain',
    country: 'Spain',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/organichairsevilla' },
      linkedin: { exists: false, url: '' },
      instagram: { exists: true, url: 'https://instagram.com/organichair_sevilla' },
      yelp: { exists: false, url: '' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=33102938' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Calle Sierpes 45, 41004 Sevilla, Spain',
      contact_number: '+34 95 4220192',
      email: 'info@organichair-sevilla.es',
      vat_number: 'ESB41029384'
    },
    personnel: {
      owner_details: 'Inmaculada Garcia (Founder)',
      manager_details: 'Manuel Fernandez (Master Stylist)',
      responsible_person: 'Inmaculada Garcia'
    },
    intelligence: {
      key_context: '100% ammonia-free plant-based hair coloration and organic herbal facials in Seville.',
      key_strategy: 'Automating email newsletter & seasonal scalp care advice.',
      annual_revenue: '$100K - $500K',
      business_scale: 'Small',
      establishment_year: 2019,
      major_revision_year: 2023,
      vision_mission: 'Sustainable non-toxic beauty empowering hair health without chemical compromise.'
    },
    metrics: {
      customer_reviews: '4.8/5 (140 reviews)',
      business_system_rating: '5.2/10 - Manual paper book scheduling',
      system_remark: 'Transitioning from physical appointment book to cloud CRM system.'
    },
    current_phase: 1,
    status: 'Discovered',
    last_contact_date: '2026-07-21',
    notes: 'Identified via Andalusian enterprise database.',
    regional_data_source: 'ICEX / Camerdata',
    score: 84
  },

  // NETHERLANDS
  {
    id: 'lead-salon-nl-21',
    business_name: 'Soap Treatment Store & Skin Clinic',
    website_link: 'https://soaptreatmentstore.com',
    business_industry: 'Skincare Center & Beauty Spa',
    target_area: 'Amsterdam, Netherlands',
    country: 'Netherlands',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/soaptreatmentstore' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/soap-treatment-store' },
      instagram: { exists: true, url: 'https://instagram.com/soaptreatmentstore' },
      yelp: { exists: true, url: 'https://yelp.nl/biz/soap-treatment-store-amsterdam' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=88192039' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/soaptreatmentstore.com' }
    },
    contact: {
      physical_address: 'Van Baerlestraat 122, 1071 BD Amsterdam, Netherlands',
      contact_number: '+31 20 6730455',
      email: 'amsterdam@soaptreatmentstore.com',
      vat_number: 'NL819203948B01'
    },
    personnel: {
      owner_details: 'Stephanie van der Berg (Co-Founder)',
      manager_details: 'Anouk Bakker (General Manager)',
      responsible_person: 'Anouk Bakker'
    },
    intelligence: {
      key_context: 'Pioneer urban beauty clinic in Amsterdam providing doctor-led facials, brows, and massages.',
      key_strategy: 'Unifying multi-city salon booking app across Amsterdam, Rotterdam, and Utrecht.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 2005,
      major_revision_year: 2025,
      vision_mission: 'No-nonsense high-performance doctor facials in an energetic city setting.'
    },
    metrics: {
      customer_reviews: '4.8/5 (390 Google reviews)',
      business_system_rating: '7.6/10 - High tech adoptability, needs AI cancellation auto-fill',
      system_remark: 'Generates 400+ weekly appointments; needs smart SMS waitlist auto-fill.'
    },
    current_phase: 5,
    status: 'Demo Booked',
    last_contact_date: '2026-07-21',
    notes: 'Demo booked with Anouk Bakker for July 24 at 10:00 AM CET.',
    regional_data_source: 'Company.info / KVK',
    score: 98
  },
  {
    id: 'lead-salon-nl-22',
    business_name: 'Rob Peetoom Hair & Beauty Lounge',
    website_link: 'https://robpeetoom.nl',
    business_industry: 'Hair Dresser & Styling Studio',
    target_area: 'Utrecht, Netherlands',
    country: 'Netherlands',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/robpeetoom' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/rob-peetoom' },
      instagram: { exists: true, url: 'https://instagram.com/robpeetoom' },
      yelp: { exists: true, url: 'https://yelp.nl/biz/rob-peetoom-utrecht' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=77192038' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/robpeetoom.nl' }
    },
    contact: {
      physical_address: 'Oudegracht 151, 3511 AL Utrecht, Netherlands',
      contact_number: '+31 30 2310192',
      email: 'utrecht@robpeetoom.nl',
      vat_number: 'NL009283741B01'
    },
    personnel: {
      owner_details: 'Rochelle Peetoom (CEO)',
      manager_details: 'Lotte de Vries (Salon Director)',
      responsible_person: 'Lotte de Vries'
    },
    intelligence: {
      key_context: 'Iconic Dutch hair salon brand with flagship studio along Oudegracht canal Utrecht.',
      key_strategy: 'Automating customer retention and custom hair oil product re-ordering.',
      annual_revenue: '$10M+',
      business_scale: 'Large',
      establishment_year: 1969,
      major_revision_year: 2024,
      vision_mission: 'Creating hair cut and color tailored to individual facial bone structure.'
    },
    metrics: {
      customer_reviews: '4.7/5 (280 reviews)',
      business_system_rating: '7.1/10 - Central website booking, lacks automated re-engagement',
      system_remark: 'Clients who haven’t visited in 60 days receive no automated win-back offer.'
    },
    current_phase: 4,
    status: 'Phase 4: Growth Blueprint Delivered',
    last_contact_date: '2026-07-20',
    notes: 'Win-back retention automation blueprint delivered to Rochelle Peetoom.',
    regional_data_source: 'Company.info / KVK',
    score: 95
  },
  {
    id: 'lead-salon-nl-23',
    business_name: 'House of Orange Skincare Lab',
    website_link: 'https://houseoforange-skin.nl',
    business_industry: 'Advanced Facial & Dermacare',
    target_area: 'Rotterdam, Netherlands',
    country: 'Netherlands',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/houseoforangeskin' },
      linkedin: { exists: false, url: '' },
      instagram: { exists: true, url: 'https://instagram.com/houseoforange_skin' },
      yelp: { exists: false, url: '' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=44192039' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Meent 94, 3011 JP Rotterdam, Netherlands',
      contact_number: '+31 10 4120192',
      email: 'info@houseoforange-skin.nl',
      vat_number: 'NL829102938B01'
    },
    personnel: {
      owner_details: 'Daan van Dijk (Co-Owner)',
      manager_details: 'Sanne Hermans (Head Dermatherapist)',
      responsible_person: 'Sanne Hermans'
    },
    intelligence: {
      key_context: 'Clinical peeling, Dermapen 4 microneedling, and LED light therapy center in Rotterdam.',
      key_strategy: 'Setting up automated post-peeling skin recovery check-in emails.',
      annual_revenue: '$500K - $2M',
      business_scale: 'Small',
      establishment_year: 2017,
      major_revision_year: 2024,
      vision_mission: 'Scientific skin transformation through precision skin barrier repair.'
    },
    metrics: {
      customer_reviews: '4.9/5 (160 reviews)',
      business_system_rating: '6.4/10 - Manual post-treatment advice',
      system_remark: 'Therapists manually send WhatsApp instructions after chemical peel treatments.'
    },
    current_phase: 2,
    status: 'Phase 2: Initial Email Sent',
    last_contact_date: '2026-07-21',
    notes: 'Email sent outlining automated post-care sequence builder.',
    regional_data_source: 'Company.info KVK',
    score: 89
  },
  {
    id: 'lead-salon-nl-24',
    business_name: 'The Hague Luxury Nail & Beauty Parlor',
    website_link: 'https://thehaguebeauty.nl',
    business_industry: 'Beauty Parlor & Nails',
    target_area: 'The Hague, Netherlands',
    country: 'Netherlands',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/thehaguebeauty' },
      linkedin: { exists: false, url: '' },
      instagram: { exists: true, url: 'https://instagram.com/thehague_beauty' },
      yelp: { exists: false, url: '' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=33102948' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Denneweg 68, 2514 CJ Den Haag, Netherlands',
      contact_number: '+31 70 3640192',
      email: 'contact@thehaguebeauty.nl',
      vat_number: 'NL910293847B01'
    },
    personnel: {
      owner_details: 'Emma Willems (Founder)',
      manager_details: 'Lisa Smits (Salon Manager)',
      responsible_person: 'Emma Willems'
    },
    intelligence: {
      key_context: 'Diplomatic quarter boutique salon providing non-toxic BIAB nail sculpting and lash lifts.',
      key_strategy: 'Automating recurring 3-week BIAB fill-in appointment reminders.',
      annual_revenue: '$100K - $500K',
      business_scale: 'Small',
      establishment_year: 2021,
      major_revision_year: 2024,
      vision_mission: 'Clean non-toxic nail health and timeless European manicure elegance.'
    },
    metrics: {
      customer_reviews: '4.8/5 (115 reviews)',
      business_system_rating: '5.9/10 - High repeat rate, manual booking system',
      system_remark: 'Relies on clients remembering to rebook every 3 weeks without system triggers.'
    },
    current_phase: 1,
    status: 'Discovered',
    last_contact_date: '2026-07-21',
    notes: 'Identified via Dutch KvK database.',
    regional_data_source: 'Company.info KVK',
    score: 86
  },

  // SWITZERLAND
  {
    id: 'lead-salon-ch-25',
    business_name: 'Nescens Clinique de Beauté & Skincare',
    website_link: 'https://nescens.com',
    business_industry: 'Medical Skincare & Anti-Aging Center',
    target_area: 'Geneva, Switzerland',
    country: 'Switzerland',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/nescens' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/nescens' },
      instagram: { exists: true, url: 'https://instagram.com/nescens_official' },
      yelp: { exists: true, url: 'https://yelp.ch/biz/nescens-clinique-geneve' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=99201928' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/nescens.com' }
    },
    contact: {
      physical_address: 'Route de Laurens 1, 1272 Genolier / Geneva, Switzerland',
      contact_number: '+41 22 3669111',
      email: 'clinique@nescens.com',
      vat_number: 'CHE109283741'
    },
    personnel: {
      owner_details: 'Swiss Medical Network Group',
      manager_details: 'Dr. Prof. Jacques Proust (Scientific Director)',
      responsible_person: 'Dr. Prof. Jacques Proust'
    },
    intelligence: {
      key_context: 'World-renowned Swiss stem cell skin science center and anti-aging medical spa.',
      key_strategy: 'Automating VIP patient intake and international medical tourism consultation workflow.',
      annual_revenue: '$10M+',
      business_scale: 'Enterprise',
      establishment_year: 2001,
      major_revision_year: 2025,
      vision_mission: 'Pioneering longevity science, cellular skin rejuvenation, and preventive medicine.'
    },
    metrics: {
      customer_reviews: '4.9/5 (280 Google reviews)',
      business_system_rating: '8.4/10 - Ultra-premium, manual VIP concierge bottleneck',
      system_remark: 'Concierge team handles private jet client booking logistics manually.'
    },
    current_phase: 8,
    status: 'Phase 8: New Value Shared',
    last_contact_date: '2026-07-20',
    notes: 'Value brief delivered regarding secure Swiss encrypted VIP medical intake portal.',
    regional_data_source: 'ZEFIX Swiss Commerce Register',
    score: 99
  },
  {
    id: 'lead-salon-ch-26',
    business_name: 'Haute Coiffure Franco Studio',
    website_link: 'https://franco-zurich.ch',
    business_industry: 'Hair Dresser & Luxury Salon',
    target_area: 'Zurich, Switzerland',
    country: 'Switzerland',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/coiffurefrancozurich' },
      linkedin: { exists: false, url: '' },
      instagram: { exists: true, url: 'https://instagram.com/franco_coiffure_zh' },
      yelp: { exists: true, url: 'https://yelp.ch/biz/franco-coiffure-zürich' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=77102948' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Bahnhofstrasse 28, 8001 Zürich, Switzerland',
      contact_number: '+41 44 2110192',
      email: 'info@franco-zurich.ch',
      vat_number: 'CHE210928374'
    },
    personnel: {
      owner_details: 'Franco Barella (Master Stylist & Owner)',
      manager_details: 'Sabrina Keller (Salon Manager)',
      responsible_person: 'Franco Barella'
    },
    intelligence: {
      key_context: 'Bahnhofstrasse Zurich premier hair design lounge catering to private bankers and executives.',
      key_strategy: 'Implementing online appointment booking with automatic CHF deposit hold.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 1996,
      major_revision_year: 2024,
      vision_mission: 'Swiss precision hair cutting and natural Italian aesthetic flair.'
    },
    metrics: {
      customer_reviews: '4.8/5 (230 reviews)',
      business_system_rating: '7.0/10 - High phone volume during business hours',
      system_remark: 'Requires automated calendar sync with Outlook/Google for Zurich financial executives.'
    },
    current_phase: 3,
    status: 'Phase 3: Deliverable Shared',
    last_contact_date: '2026-07-21',
    notes: 'Shared calendar integration proposal.',
    regional_data_source: 'ZEFIX / Local.ch',
    score: 94
  },

  // AUSTRIA
  {
    id: 'lead-salon-at-29',
    business_name: 'Josef Stadtmüller Hair & Beauty Salon',
    website_link: 'https://stadtmueller-hair.at',
    business_industry: 'Hair Dresser & Skincare Lounge',
    target_area: 'Vienna, Austria',
    country: 'Austria',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/stadtmuellerhair' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/stadtmueller-hair' },
      instagram: { exists: true, url: 'https://instagram.com/stadtmueller_wien' },
      yelp: { exists: true, url: 'https://yelp.at/biz/stadtmüller-hair-wien' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=88102958' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/stadtmueller-hair.at' }
    },
    contact: {
      physical_address: 'Kärntner Straße 18, 1010 Wien, Austria',
      contact_number: '+43 1 5120192',
      email: 'office@stadtmueller-hair.at',
      vat_number: 'ATU61029384'
    },
    personnel: {
      owner_details: 'Josef Stadtmüller (Founder)',
      manager_details: 'Verena Hofer (Salon Director)',
      responsible_person: 'Verena Hofer'
    },
    intelligence: {
      key_context: 'Classic Viennese high-fashion salon located on Kärntner Straße.',
      key_strategy: 'Automating VIP booking and luxury hair care product subscription box.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 1988,
      major_revision_year: 2024,
      vision_mission: 'Viennese elegance and masterful haircutting tradition.'
    },
    metrics: {
      customer_reviews: '4.8/5 (260 reviews)',
      business_system_rating: '7.1/10 - High client loyalty, outdated web booking engine',
      system_remark: 'Mobile booking UI requires 7 steps; needs 2-step fast checkout widget.'
    },
    current_phase: 7,
    status: 'Phase 7: Multi-Channel Outreach',
    last_contact_date: '2026-07-20',
    notes: 'Outreach active for fast 2-step mobile booking UI upgrade.',
    regional_data_source: 'Herold / WKO Austria',
    score: 93
  },
  {
    id: 'lead-salon-at-30',
    business_name: 'Pure Skin Institute & Medical Spa',
    website_link: 'https://pureskin-salzburg.at',
    business_industry: 'Skincare & Laser Center',
    target_area: 'Salzburg, Austria',
    country: 'Austria',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/pureskinsalzburg' },
      linkedin: { exists: false, url: '' },
      instagram: { exists: true, url: 'https://instagram.com/pureskin_salzburg' },
      yelp: { exists: false, url: '' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=44102958' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Getreidegasse 32, 5020 Salzburg, Austria',
      contact_number: '+43 662 840192',
      email: 'office@pureskin-salzburg.at',
      vat_number: 'ATU59102938'
    },
    personnel: {
      owner_details: 'Dr. Elisabeth Huber (Medical Director)',
      manager_details: 'Petra Wallner (Clinic Coordinator)',
      responsible_person: 'Petra Wallner'
    },
    intelligence: {
      key_context: 'Salzburg Getreidegasse laser skincare and anti-aging aesthetic center.',
      key_strategy: 'Automating treatment series reminders and post-laser recovery check-ins.',
      annual_revenue: '$500K - $2M',
      business_scale: 'Small',
      establishment_year: 2015,
      major_revision_year: 2024,
      vision_mission: 'Pure skin rejuvenation with gentle non-invasive dermatological technology.'
    },
    metrics: {
      customer_reviews: '4.9/5 (170 reviews)',
      business_system_rating: '6.5/10 - Lacks automated treatment sequence management',
      system_remark: 'Patients miss 2nd and 3rd laser session follow-ups without automated reminders.'
    },
    current_phase: 2,
    status: 'Phase 2: Initial Email Sent',
    last_contact_date: '2026-07-21',
    notes: 'Initial email sent regarding laser treatment sequence automation.',
    regional_data_source: 'Herold / WKO',
    score: 89
  },

  // SWEDEN
  {
    id: 'lead-salon-se-32',
    business_name: 'Björn Axén Hair Academy & Salon',
    website_link: 'https://bjornaxen.se',
    business_industry: 'Premium Hair Dresser & Scalp Care',
    target_area: 'Stockholm, Sweden',
    country: 'Sweden',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/bjornaxen' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/bjorn-axen' },
      instagram: { exists: true, url: 'https://instagram.com/bjornaxen' },
      yelp: { exists: true, url: 'https://yelp.se/biz/björn-axén-stockholm' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=99102958' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/bjornaxen.se' }
    },
    contact: {
      physical_address: 'Birger Jarlsgatan 18, 114 34 Stockholm, Sweden',
      contact_number: '+46 8 54527350',
      email: 'birgerjarlsgatan@bjornaxen.se',
      vat_number: 'SE556102938401'
    },
    personnel: {
      owner_details: 'Johan Hellström (Owner & Creative Director)',
      manager_details: 'Karin Söderberg (Salon Network Operations)',
      responsible_person: 'Karin Söderberg'
    },
    intelligence: {
      key_context: 'Sweden’s royal warrant hair salon brand with flagship studio in Östermalm Stockholm.',
      key_strategy: 'Scaling e-commerce hair care recurring subscription alongside salon appointments.',
      annual_revenue: '$10M+',
      business_scale: 'Large',
      establishment_year: 1963,
      major_revision_year: 2025,
      vision_mission: 'Royal Swedish hair care craftsmanship and sustainable organic product innovation.'
    },
    metrics: {
      customer_reviews: '4.8/5 (410 Google reviews)',
      business_system_rating: '8.1/10 - Advanced digital ecosystem, needs smart salon retention AI',
      system_remark: 'High e-commerce traffic; needs cross-channel integration to drive salon visits.'
    },
    current_phase: 5,
    status: 'Phase 5: Proposal & Demo Invite',
    last_contact_date: '2026-07-21',
    notes: 'Demo invite sent to Johan Hellström for cross-channel retail & appointment engine.',
    regional_data_source: 'Vainu / Bolagsverket',
    score: 98
  },

  // BELGIUM
  {
    id: 'lead-salon-be-35',
    business_name: 'Maison Degand Beauty Lounge & Spa',
    website_link: 'https://degandbeauty.be',
    business_industry: 'Luxury Beauty Parlor & Skincare',
    target_area: 'Brussels, Belgium',
    country: 'Belgium',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/degandbeautybrussels' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/maison-degand' },
      instagram: { exists: true, url: 'https://instagram.com/degandbeauty_brussels' },
      yelp: { exists: true, url: 'https://yelp.be/biz/maison-degand-brussels' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=88102968' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/degandbeauty.be' }
    },
    contact: {
      physical_address: 'Avenue Louise 415, 1050 Bruxelles, Belgium',
      contact_number: '+32 2 6480192',
      email: 'lounge@degandbeauty.be',
      vat_number: 'BE0419203918'
    },
    personnel: {
      owner_details: 'Pierre Degand (Founder)',
      manager_details: 'Marie-Claire Dubois (Spa Director)',
      responsible_person: 'Marie-Claire Dubois'
    },
    intelligence: {
      key_context: 'Ultra-exclusive Avenue Louise beauty lounge catering to EU diplomats and royalty.',
      key_strategy: 'Implementing multi-lingual (French, Dutch, English) AI online concierge.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 1983,
      major_revision_year: 2025,
      vision_mission: 'Uncompromising Belgian craftsmanship, privacy, and luxury skin therapy.'
    },
    metrics: {
      customer_reviews: '4.8/5 (210 reviews)',
      business_system_rating: '7.3/10 - High brand equity, manual phone concierge desk',
      system_remark: 'Reception desk overwhelmed by bilingual phone calls.'
    },
    current_phase: 4,
    status: 'Phase 4: Growth Blueprint Delivered',
    last_contact_date: '2026-07-20',
    notes: 'Bilingual AI concierge blueprint delivered to Marie-Claire Dubois.',
    regional_data_source: 'KBO / BCE Enterprise Registry',
    score: 95
  },

  // DENMARK
  {
    id: 'lead-salon-dk-38',
    business_name: 'Gunn-Britt Zeller Hair Design Lounge',
    website_link: 'https://gunnbritt.dk',
    business_industry: 'Hair Dresser & Couture Styling',
    target_area: 'Copenhagen, Denmark',
    country: 'Denmark',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/gunnbrittzeller' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/gunn-britt' },
      instagram: { exists: true, url: 'https://instagram.com/gunnbrittzeller' },
      yelp: { exists: true, url: 'https://yelp.dk/biz/gunn-britt-københavn' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=88102978' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/gunnbritt.dk' }
    },
    contact: {
      physical_address: 'Ny Østergade 7, 1101 København, Denmark',
      contact_number: '+45 33 130192',
      email: 'salon@gunnbritt.dk',
      vat_number: 'DK19203948'
    },
    personnel: {
      owner_details: 'Gunn-Britt Zeller (Founder & Master Stylist)',
      manager_details: 'Mikkel Zeller (Operations Director)',
      responsible_person: 'Mikkel Zeller'
    },
    intelligence: {
      key_context: 'Denmark’s most celebrated high-fashion hair salon brand in central Copenhagen.',
      key_strategy: 'Automating customer loyalty re-booking sequences and custom shampoo line sales.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 1976,
      major_revision_year: 2025,
      vision_mission: 'Danish Scandinavian hair perfection, timeless elegance, and hair vitality.'
    },
    metrics: {
      customer_reviews: '4.8/5 (290 Google reviews)',
      business_system_rating: '7.5/10 - Solid CVR integration, needs automated retention flow',
      system_remark: 'Requires automated SMS reminder 14 days before 6-week haircut cycle expires.'
    },
    current_phase: 6,
    status: 'Phase 6: Monthly Scaling Nurture',
    last_contact_date: '2026-07-19',
    notes: 'Active monthly nurture targeting automated 6-week re-booking SMS sequence.',
    regional_data_source: 'CVR Central Business Register',
    score: 96
  },

  // NORWAY
  {
    id: 'lead-salon-no-40',
    business_name: 'Jan Thomas Studio Hair & Makeup',
    website_link: 'https://janthomas.no',
    business_industry: 'Hair Dresser & Styling Lounge',
    target_area: 'Oslo, Norway',
    country: 'Norway',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/janthomasstudio' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/jan-thomas-studio' },
      instagram: { exists: true, url: 'https://instagram.com/janthomasstudio' },
      yelp: { exists: true, url: 'https://yelp.no/biz/jan-thomas-studio-oslo' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=99102978' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/janthomas.no' }
    },
    contact: {
      physical_address: 'Parkveien 55, 0256 Oslo, Norway',
      contact_number: '+47 22 550192',
      email: 'post@janthomas.no',
      vat_number: 'NO910293847MVA'
    },
    personnel: {
      owner_details: 'Jan Thomas (Founder & Creative Director)',
      manager_details: 'Kristian Moe (General Manager)',
      responsible_person: 'Kristian Moe'
    },
    intelligence: {
      key_context: 'Norway’s celebrity hair studio in Frogner Oslo specializing in high-definition transformations.',
      key_strategy: 'Automating VIP booking portal and VIP client re-engagement campaigns.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 2008,
      major_revision_year: 2025,
      vision_mission: 'Hollywood glamour adapted for Nordic natural elegance.'
    },
    metrics: {
      customer_reviews: '4.8/5 (310 Google reviews)',
      business_system_rating: '7.4/10 - High brand visibility, phone booking congestion',
      system_remark: 'Phone lines jammed during peak morning hours; needs AI voice/chat booking agent.'
    },
    current_phase: 3,
    status: 'Phase 3: Deliverable Shared',
    last_contact_date: '2026-07-20',
    notes: 'Shared AI Voice/Chat receptionist demo video.',
    regional_data_source: 'Brønnøysundregistrene Norway',
    score: 95
  },

  // FINLAND
  {
    id: 'lead-salon-fi-43',
    business_name: 'Haven Spa & Nordic Skincare Clinic',
    website_link: 'https://havenspa-helsinki.fi',
    business_industry: 'Skincare Center & Spa',
    target_area: 'Helsinki, Finland',
    country: 'Finland',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/havenspahelsinki' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/haven-spa-helsinki' },
      instagram: { exists: true, url: 'https://instagram.com/havenspa_helsinki' },
      yelp: { exists: false, url: '' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=22102988' },
      trustpilot: { exists: true, url: 'https://trustpilot.com/review/havenspa-helsinki.fi' }
    },
    contact: {
      physical_address: 'Unioninkatu 17, 00130 Helsinki, Finland',
      contact_number: '+358 9 6810293',
      email: 'info@havenspa-helsinki.fi',
      vat_number: 'FI31029384'
    },
    personnel: {
      owner_details: 'Laura Laitinen (Founder)',
      manager_details: 'Ville Nieminen (Operations Manager)',
      responsible_person: 'Laura Laitinen'
    },
    intelligence: {
      key_context: 'Nordic luxury day spa offering Finnish peat body masks, saunas, and anti-aging facials.',
      key_strategy: 'Automating corporate wellness voucher sales for Helsinki tech companies.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 2011,
      major_revision_year: 2025,
      vision_mission: 'Authentic Finnish sauna wellness and arctic botanical skin vitality.'
    },
    metrics: {
      customer_reviews: '4.9/5 (240 reviews)',
      business_system_rating: '7.2/10 - Solid web booking, manual corporate gift voucher invoicing',
      system_remark: 'Spends 5+ hours weekly invoicing corporate B2B wellness packages manually.'
    },
    current_phase: 4,
    status: 'Phase 4: Growth Blueprint Delivered',
    last_contact_date: '2026-07-20',
    notes: 'B2B corporate voucher automated invoicing blueprint delivered.',
    regional_data_source: 'PRH / Fonecta Finder',
    score: 93
  },

  // PORTUGAL
  {
    id: 'lead-salon-pt-44',
    business_name: 'Cabeleireiro Llongueras Hair Lounge',
    website_link: 'https://llongueras.pt',
    business_industry: 'Hair Dresser & Color Atelier',
    target_area: 'Lisbon, Portugal',
    country: 'Portugal',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/llonguerasportugal' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/llongueras-portugal' },
      instagram: { exists: true, url: 'https://instagram.com/llongueras_pt' },
      yelp: { exists: true, url: 'https://yelp.pt/biz/llongueras-lisboa' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=77102988' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Avenida da Liberdade 180, 1250-146 Lisboa, Portugal',
      contact_number: '+351 21 3520192',
      email: 'liberdade@llongueras.pt',
      vat_number: 'PT501928374'
    },
    personnel: {
      owner_details: 'Rui Silva (Master Franchise Director)',
      manager_details: 'Ana Santos (Salon Manager)',
      responsible_person: 'Ana Santos'
    },
    intelligence: {
      key_context: 'Flagship salon on Avenida da Liberdade catering to Lisbon locals and digital nomads.',
      key_strategy: 'Setting up multi-lingual instant online reservation with WhatsApp confirmation.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 1995,
      major_revision_year: 2024,
      vision_mission: 'Iberian fashion styling and expressive haircutting precision.'
    },
    metrics: {
      customer_reviews: '4.7/5 (280 reviews)',
      business_system_rating: '6.8/10 - High footfall, phone inquiry congestion',
      system_remark: 'Digital nomad clientele expects instant online scheduling rather than phone calls.'
    },
    current_phase: 3,
    status: 'Phase 3: Deliverable Shared',
    last_contact_date: '2026-07-21',
    notes: 'Shared digital nomad fast WhatsApp booking portal flow.',
    regional_data_source: 'Racius / Portugal Business Registry',
    score: 91
  },

  // LUXEMBOURG
  {
    id: 'lead-salon-lu-46',
    business_name: 'Coiffure Claude Luxury Hair Studio',
    website_link: 'https://coiffure-claude.lu',
    business_industry: 'Hair Dresser & Salon',
    target_area: 'Luxembourg City, Luxembourg',
    country: 'Luxembourg',
    presence: {
      facebook: { exists: true, url: 'https://facebook.com/coiffureclaudeluxembourg' },
      linkedin: { exists: true, url: 'https://linkedin.com/company/coiffure-claude' },
      instagram: { exists: true, url: 'https://instagram.com/coiffure_claude_lu' },
      yelp: { exists: false, url: '' },
      google_business: { exists: true, url: 'https://maps.google.com/?cid=88102998' },
      trustpilot: { exists: false, url: '' }
    },
    contact: {
      physical_address: 'Grand-Rue 42, 1660 Luxembourg, Luxembourg',
      contact_number: '+352 22 4019',
      email: 'info@coiffure-claude.lu',
      vat_number: 'LU19203948'
    },
    personnel: {
      owner_details: 'Claude Weber (Founder & Master Stylist)',
      manager_details: 'Nathalie Schmit (Salon Director)',
      responsible_person: 'Nathalie Schmit'
    },
    intelligence: {
      key_context: 'Grand-Rue Luxembourg premium salon catering to EU institution directors and banking executives.',
      key_strategy: 'Automating multi-lingual (French, German, English) booking calendar.',
      annual_revenue: '$2M - $10M',
      business_scale: 'Medium',
      establishment_year: 1992,
      major_revision_year: 2024,
      vision_mission: 'European elegance and bespoke haircutting for international professionals.'
    },
    metrics: {
      customer_reviews: '4.8/5 (190 reviews)',
      business_system_rating: '7.1/10 - High ticket size, phone reservation bottleneck',
      system_remark: '4 language phone calls handle ~45 bookings daily manually.'
    },
    current_phase: 5,
    status: 'Phase 5: Proposal & Demo Invite',
    last_contact_date: '2026-07-21',
    notes: 'Demo invite sent for 4-language AI web scheduling widget.',
    regional_data_source: 'RCS Luxembourg Business Register',
    score: 94
  }
];

export const SALON_LEADS: Lead[] = [...SALON_LEADS_PART1, ...SALON_LEADS_PART2];
