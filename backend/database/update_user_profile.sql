ALTER TABLE user_details
ADD COLUMN IF NOT EXISTS display_name VARCHAR(80);

ALTER TABLE user_details
ADD COLUMN IF NOT EXISTS profile_picture BYTEA;

ALTER TABLE user_details
ADD COLUMN IF NOT EXISTS profile_picture_mime_type VARCHAR(50);

ALTER TABLE user_details
ADD COLUMN IF NOT EXISTS profile_picture_updated_at TIMESTAMPTZ;

UPDATE user_details
SET display_name = username
WHERE display_name IS NULL;

ALTER TABLE user_details
ALTER COLUMN display_name SET NOT NULL;
