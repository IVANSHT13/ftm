import { getSupabaseClient } from './auth.js';

const TEAM_ASSET_BUCKET = 'team-assets';

function getFileExtension(file) {
  const match = file.name.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : 'bin';
}

async function uploadAsset(client, teamId, assetType, file) {
  const extension = getFileExtension(file);
  const safeAssetName = `${assetType}-${crypto.randomUUID()}.${extension}`;
  const path = `${teamId}/${safeAssetName}`;

  const { error: uploadError } = await client.storage
    .from(TEAM_ASSET_BUCKET)
    .upload(path, file, {
      contentType: file.type || 'application/octet-stream',
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = client.storage.from(TEAM_ASSET_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function createTeamRecord({
  name,
  shortName,
  managerId,
  managerName,
  managerEmail,
  description,
  foundedYear,
  logoFile,
  photoFile,
}) {
  const client = getSupabaseClient();
  const teamId = crypto.randomUUID();

  const [logoUrl, photoUrl] = await Promise.all([
    logoFile ? uploadAsset(client, teamId, 'logo', logoFile) : Promise.resolve(null),
    photoFile ? uploadAsset(client, teamId, 'photo', photoFile) : Promise.resolve(null),
  ]);

  const { data, error } = await client
    .from('teams')
    .insert({
      id: teamId,
      name,
      short_name: shortName,
      manager_id: managerId,
      manager_name: managerName,
      manager_email: managerEmail,
      description,
      founded_year: foundedYear || null,
      logo_url: logoUrl,
      photo_url: photoUrl,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
}