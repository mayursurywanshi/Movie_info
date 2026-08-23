CREATE TABLE IF NOT EXISTS user_login_details (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    username VARCHAR(50) NOT NULL,
    login_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    token_id UUID NOT NULL UNIQUE,
    token_expires_at TIMESTAMPTZ NOT NULL,
    logout_at TIMESTAMPTZ,

    CONSTRAINT user_login_details_user_fk
        FOREIGN KEY (user_id)
        REFERENCES user_details(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS user_login_details_user_id_index
ON user_login_details (user_id);

CREATE INDEX IF NOT EXISTS user_login_details_login_at_index
ON user_login_details (login_at DESC);
