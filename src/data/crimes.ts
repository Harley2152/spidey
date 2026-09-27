export interface CrimeAlert {
  id: string;
  district: string;
  title: string;
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  type: 'Robbery' | 'Hostage' | 'Vehicle Chase' | 'Oscorp Break-In' | 'Rooftop Snipers' | 'Fisk Hideout';
  description: string;
  coordinates: { x: number; y: number }; // percentage on map
  dispatchCall: string;
  rewards: string;
  resolved: boolean;
}

export const INITIAL_CRIMES: CrimeAlert[] = [
  {
    id: 'crime-1',
    district: 'Financial District',
    title: 'Armored Truck Ambush',
    threatLevel: 'High',
    type: 'Robbery',
    description: 'Heavily armed mercenaries using military EMP charges have cornered an Oscorp courier truck near Wall St.',
    coordinates: { x: 42, y: 78 },
    dispatchCall: 'All units, 10-99 in progress at Broad & Exchange. Heavy munitions reported.',
    rewards: '+250 XP · 2 Crime Tokens',
    resolved: false
  },
  {
    id: 'crime-2',
    district: 'Midtown Manhattan',
    title: 'Rooftop Drone Hackers',
    threatLevel: 'Medium',
    type: 'Oscorp Break-In',
    description: 'Rogue hacker cell hijacking communications towers to intercept NYPD encrypted telemetry feeds.',
    coordinates: { x: 55, y: 48 },
    dispatchCall: 'Signal tampering detected atop Chrysler Building sector 4B.',
    rewards: '+150 XP · 1 Research Token',
    resolved: false
  },
  {
    id: 'crime-3',
    district: 'Hell’s Kitchen',
    title: 'Fisk Syndicate Smuggling Depot',
    threatLevel: 'Critical',
    type: 'Fisk Hideout',
    description: 'Underground weapons shipment guarded by Kingpin enforcers with brute assault armor and laser sight carbines.',
    coordinates: { x: 30, y: 52 },
    dispatchCall: 'Anonymous tip indicates contraband unloading at 10th Ave shipping warehouse.',
    rewards: '+400 XP · 3 Base Tokens',
    resolved: false
  },
  {
    id: 'crime-4',
    district: 'Harlem',
    title: 'High-Speed Getaway Vehicle',
    threatLevel: 'High',
    type: 'Vehicle Chase',
    description: 'Suspects fleeing jewelry heist at 120 mph heading southbound along FDR Drive with stolen sports car.',
    coordinates: { x: 62, y: 18 },
    dispatchCall: 'Pursuit active on FDR south! Suspect weaving dangerously through oncoming traffic.',
    rewards: '+200 XP · 1 Crime Token',
    resolved: false
  },
  {
    id: 'crime-5',
    district: 'Central Park',
    title: 'Hostage Standoff at Bethesda Terrace',
    threatLevel: 'Critical',
    type: 'Hostage',
    description: 'Demons cell holding civilian tour group captive with remote explosive detonators.',
    coordinates: { x: 50, y: 34 },
    dispatchCall: 'Emergency 10-13! Civilian hostages reported near Central Park fountain.',
    rewards: '+500 XP · 3 Crime Tokens',
    resolved: false
  },
  {
    id: 'crime-6',
    district: 'Chinatown',
    title: 'Rooftop Laser Snipers',
    threatLevel: 'Medium',
    type: 'Rooftop Snipers',
    description: 'Two marksmen with thermal-scoped rifles positioned on tenement rooftops covering street operations.',
    coordinates: { x: 48, y: 68 },
    dispatchCall: 'Laser sights spotted targeting patrol cruiser on Mott Street.',
    rewards: '+180 XP · 1 Token',
    resolved: false
  }
];
