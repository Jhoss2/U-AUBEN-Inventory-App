import { getDBConnection } from '../database/db';

export const checkMaterielExpiration = async () => {
  const db = await getDBConnection();
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  const results = await db.executeSql('SELECT * FROM materiel WHERE dateRen IS NOT NULL AND dateRen != ""');
  const rows = results[0].rows;
  
  for (let i = 0; i < rows.length; i++) {
    const item = rows.item(i);
    const expirationDate = new Date(item.dateRen);
    expirationDate.setHours(0, 0, 0, 0);
    
    if (expirationDate <= oneWeekFromNow && expirationDate >= now) {
      // Check if alert already exists
      const existing = await db.executeSql('SELECT id FROM alerts WHERE materielId = ?', [item.id]);
      if (existing[0].rows.length === 0) {
        const salleResult = await db.executeSql('SELECT nom FROM salles WHERE id = ?', [item.salleId]);
        const salleNom = salleResult[0].rows.length > 0 ? salleResult[0].rows.item(0).nom : 'Inconnue';
        
        const alertId = \`alert-mat-\${item.id}\`;
        await db.executeSql(
          'INSERT INTO alerts (id, title, message, date, read, materielId) VALUES (?, ?, ?, ?, ?, ?)',
          [
            alertId,
            'Avertissement de renouvellement',
            \`Le matériel "\${item.nom}" (Salle: \${salleNom}) doit être renouvelé le \${item.dateRen}.\`,
            new Date().toISOString(),
            0,
            item.id
          ]
        );
      }
    }
  }
};
