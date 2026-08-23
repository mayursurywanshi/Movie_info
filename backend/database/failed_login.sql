CREATE TABLE IF NOT EXISTS failed_login (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT,
    identifier VARCHAR(255) NOT NULL,
    failure_reason VARCHAR(30) NOT NULL,
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT,

    CONSTRAINT failed_login_user_fk
        FOREIGN KEY (user_id)
        REFERENCES user_details(id)
        ON DELETE SET NULL,

    CONSTRAINT failed_login_reason_check
        CHECK (
            failure_reason IN (
                'user_not_found',
                'invalid_password'
            )
        )
);

CREATE INDEX IF NOT EXISTS failed_login_identifier_index
ON failed_login (LOWER(identifier));

CREATE INDEX IF NOT EXISTS failed_login_attempted_at_index
ON failed_login (attempted_at DESC);
