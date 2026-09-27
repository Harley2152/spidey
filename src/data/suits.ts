export interface SuitData {
  id: string;
  name: string;
  codename: string;
  creator: string;
  lore: string;
  primaryColor: string;
  secondaryColor: string;
  hudColor: string;
  hudGlowRgba: string;
  emblemText: string;
  specialAbility: string;
  abilityDesc: string;
  schematicCode: string;
  defenseRating: number;
  agilityRating: number;
  gadgetRating: number;
  stealthRating: number;
  suitMods: string[];
  quote: string;
}

export const SUITS_DATABASE: SuitData[] = [
  {
    id: 'advanced',
    name: 'Advanced Suit 2.0',
    codename: 'Mark IV // Classic Reinforcement',
    creator: 'Peter Parker & Dr. Otto Octavius',
    lore: 'Engineered with flexible isolated web-fluid lines and flexible carbon-fiber plating over flexible spandex. The prominent white spider emblem acts as high-density chest armor deflecting direct kinetic impacts.',
    primaryColor: '#e11d48',
    secondaryColor: '#0284c7',
    hudColor: '#00e5ff',
    hudGlowRgba: 'rgba(0, 229, 255, 0.45)',
    emblemText: 'High-Density White Carbon Weave',
    specialAbility: 'Web Blossom',
    abilityDesc: 'Leap into the air and fire a continuous 360-degree spray of pneumatic webbing to incapacitate all nearby targets.',
    schematicCode: 'X00 // ADV-MK4',
    defenseRating: 88,
    agilityRating: 95,
    gadgetRating: 92,
    stealthRating: 70,
    suitMods: ['Ballistic Kinetic Padding', 'Rapid Web-Charge Condenser', 'Threat Triangulation Sensor'],
    quote: 'With great power comes great responsibility.',
  },
  {
    id: 'miles',
    name: 'Miles Morales G.K.I.',
    codename: 'Brooklyn Classic // Bio-Conductive',
    creator: 'Miles Morales & Ganke Lee',
    lore: 'Customized with breathable stealth polymers and conductive micro-threading. Tailored specifically to ground and amplify bio-electric Venom pulses while maintaining maximum parkour agility.',
    primaryColor: '#18181b',
    secondaryColor: '#ef4444',
    hudColor: '#facc15',
    hudGlowRgba: 'rgba(250, 204, 21, 0.45)',
    emblemText: 'Spray-Painted Crimson Spider',
    specialAbility: 'Mega Venom Blast',
    abilityDesc: 'Release a devastating omnidirectional bio-electric shockwave that overloads hostile tech and paralyzes enemies.',
    schematicCode: 'BKN-MM // 01-BIO',
    defenseRating: 82,
    agilityRating: 98,
    gadgetRating: 85,
    stealthRating: 94,
    suitMods: ['Venom Overdrive Core', 'Optical Invisibility Cloak', 'Bio-Electric Discharge'],
    quote: 'Anyone can wear the mask. How you wear it is what makes you Spider-Man.',
  },
  {
    id: 'iron_spider',
    name: 'Iron Spider Nanotech',
    codename: 'Stark Industries // Mark XVII',
    creator: 'Tony Stark & Peter Parker',
    lore: 'Forged from liquid-nanotech titanium-gold matrix. Features neural link interface, sealed life support systems, and three deployable mechanical waldoes constructed from monomolecular alloy.',
    primaryColor: '#b91c1c',
    secondaryColor: '#ca8a04',
    hudColor: '#38bdf8',
    hudGlowRgba: 'rgba(56, 189, 248, 0.45)',
    emblemText: 'Gold Waldo Nanite Core',
    specialAbility: 'Iron Arms Deploy',
    abilityDesc: 'Unfurl four rapid-strike robotic waldoes from the spinal mount to parry melee strikes and juggle adversaries.',
    schematicCode: 'STARK-IS // NANITE-50',
    defenseRating: 99,
    agilityRating: 80,
    gadgetRating: 99,
    stealthRating: 60,
    suitMods: ['Micro-Thruster Boosters', 'Arc Reactor Capacitors', 'Nanite Tissue Repair'],
    quote: 'Mr. Stark, it smells like a new car in here!',
  },
  {
    id: 'spiderman_2099',
    name: 'Spider-Man 2099',
    codename: 'Alchemax // Unstable Molecule',
    creator: 'Miguel O’Hara',
    lore: 'Synthesized from 2099 unstable molecule fabric with light-absorbing properties. Integrated with low-density glider cape, forearm talons, and high-frequency optical camouflage for Nueva York.',
    primaryColor: '#1e1b4b',
    secondaryColor: '#f43f5e',
    hudColor: '#ec4899',
    hudGlowRgba: 'rgba(236, 72, 153, 0.45)',
    emblemText: 'Alchemax Skull Glyph',
    specialAbility: 'Low Gravity Slipstream',
    abilityDesc: 'Manipulate local gravity and generate a temporal after-image decoy that confuses targeting systems.',
    schematicCode: 'NY-2099 // MOH-GEN2',
    defenseRating: 86,
    agilityRating: 96,
    gadgetRating: 90,
    stealthRating: 88,
    suitMods: ['Glider Cape Aerodynamics', 'Talons Molecular Edge', 'Chrono Distortion Field'],
    quote: 'You are an anomaly. But I will preserve the canon.',
  },
  {
    id: 'stealth',
    name: 'Stealth Suit (Big Time)',
    codename: 'Horizon Labs // Omni-Harmonic',
    creator: 'Peter Parker (Horizon Labs)',
    lore: 'Engineered using omni-harmonic mesh that refracts light and absorbs all sound wave frequencies within a 15-meter radius. Perfect for silent infiltration of fortified facilities.',
    primaryColor: '#0f172a',
    secondaryColor: '#10b981',
    hudColor: '#10b981',
    hudGlowRgba: 'rgba(16, 185, 129, 0.45)',
    emblemText: 'Phosphorescent Neon Emerald Spider',
    specialAbility: 'Blur Projector',
    abilityDesc: 'Project a wide-band audio-visual dampening field, rendering the wearer invisible to laser grids and motion sensors.',
    schematicCode: 'HZ-LABS // NEON-07',
    defenseRating: 75,
    agilityRating: 94,
    gadgetRating: 93,
    stealthRating: 100,
    suitMods: ['Acoustic Suppressor', 'Anti-Infrared Coating', 'Silent Step Dampeners'],
    quote: 'Quiet down. The shadows belong to me now.',
  },
  {
    id: 'symbiote',
    name: 'Symbiote Alien Suit',
    codename: 'Klyntar // Living Bio-Organism',
    creator: 'Extraterrestrial Lifeform',
    lore: 'Living bio-mass bonded to host neural pathways. Provides near-limitless organic web generation, self-mending epidermal tissue, and brutal predatory strength at the risk of aggression.',
    primaryColor: '#09090b',
    secondaryColor: '#fafafa',
    hudColor: '#a855f7',
    hudGlowRgba: 'rgba(168, 85, 247, 0.45)',
    emblemText: 'Living Jagged White Venom Spider',
    specialAbility: 'Symbiote Surge',
    abilityDesc: 'Unleash an explosion of razor-sharp organic tendrils in all directions, slamming enemies into walls and ceilings.',
    schematicCode: 'KLYNTAR // BIO-APEX',
    defenseRating: 97,
    agilityRating: 92,
    gadgetRating: 70,
    stealthRating: 91,
    suitMods: ['Tendril Grab Extension', 'Predatory Reflexes', 'Regenerative Bio-Mass'],
    quote: 'We are poison. We are... Spider-Man.',
  },
];
