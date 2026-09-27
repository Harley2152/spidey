export interface GadgetData {
  id: string;
  name: string;
  type: string;
  capacity: number;
  refillTimeSeconds: number;
  description: string;
  schematicDetails: string[];
  techSpec: {
    tensileStrength: string;
    compressionPsi: string;
    dissolutionTime: string;
    effectiveRange: string;
  };
}

export const GADGETS_DATABASE: GadgetData[] = [
  {
    id: 'standard_web',
    name: 'Standard Web-Shooter',
    type: 'Tensile Swing & Restraint',
    capacity: 10,
    refillTimeSeconds: 3,
    description: 'Dual wrist-mounted pneumatic dispensers that fire shear-thickening nylon-polymeric fluid. Threads harden on contact with air into tensile fibers stronger than steel cable.',
    schematicDetails: [
      'Twin solenoid valves with rapid pulsed trigger',
      'Rotary spinneret nozzle with adjustable thread gauge',
      'Teflon-lined pressure cylinder rated to 300 psi',
      'Palm pressure sensor with micro-switch dual tap'
    ],
    techSpec: {
      tensileStrength: '120 lbs / mm²',
      compressionPsi: '300 PSI',
      dissolutionTime: '1 Hour (Biodegradable)',
      effectiveRange: '50 Meters'
    }
  },
  {
    id: 'impact_web',
    name: 'Impact Web Slug',
    type: 'Kinetic Knockdown & Wall Pin',
    capacity: 4,
    refillTimeSeconds: 6,
    description: 'Compresses a concentrated ball of rapid-expanding web fluid. On impact with target, instantly unleashes high-elastic tendrils that adhere and pin the enemy to solid surfaces.',
    schematicDetails: [
      'High-velocity projectile chamber',
      'Impact detonator fuse cap',
      'Hyper-expanding coagulant agent',
      'Centrifugal stabilizing fins'
    ],
    techSpec: {
      tensileStrength: '210 lbs / mm²',
      compressionPsi: '650 PSI',
      dissolutionTime: '45 Minutes',
      effectiveRange: '35 Meters'
    }
  },
  {
    id: 'web_bomb',
    name: 'Web Bomb Cluster',
    type: 'Crowd Suppression Area-of-Effect',
    capacity: 3,
    refillTimeSeconds: 8,
    description: 'A pressurized canister that primes upon launch and erupts into a 360-degree net of heavy web strands, incapacitating groups of adversaries simultaneously.',
    schematicDetails: [
      'Micro-fragmentation canister casing',
      'Proximity acoustic sensor trigger',
      'Pressurized multi-directional radial nozzles',
      'Polymer cross-linking accelerant'
    ],
    techSpec: {
      tensileStrength: '160 lbs / mm²',
      compressionPsi: '800 PSI',
      dissolutionTime: '1.5 Hours',
      effectiveRange: '8m Radius Blast'
    }
  },
  {
    id: 'electric_web',
    name: 'Electric Shock Web',
    type: 'Bio-Electric Stun Discharge',
    capacity: 4,
    refillTimeSeconds: 7,
    description: 'Electrified web filaments infused with conductive micro-particles. Delivers an escalating voltage pulse that short-circuits weapon systems and shocks adjacent enemies.',
    schematicDetails: [
      'Piezo-electric spark generator module',
      'Conductive silver-infused web fluid cartridge',
      'Dual arc-discharge prongs',
      'Target-grounding return circuit'
    ],
    techSpec: {
      tensileStrength: '95 lbs / mm²',
      compressionPsi: '280 PSI',
      dissolutionTime: '30 Minutes',
      effectiveRange: '25 Meters'
    }
  },
  {
    id: 'suspension_matrix',
    name: 'Suspension Anti-Grav Matrix',
    type: 'Gravitational Lift Field',
    capacity: 3,
    refillTimeSeconds: 9,
    description: 'Deploys a localized graviton distortion field, lifting surrounding enemies into zero-gravity suspension and leaving them vulnerable to aerial combat.',
    schematicDetails: [
      'Miniaturized graviton coil array',
      'Tritium micro-capacitor core',
      'Stabilized levitation emitter dish',
      'Overheating heat sink fins'
    ],
    techSpec: {
      tensileStrength: 'N/A (Gravitational)',
      compressionPsi: 'Zero G Field',
      dissolutionTime: '12s Active Window',
      effectiveRange: '6m Vertical Radius'
    }
  }
];
