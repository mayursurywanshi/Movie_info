CREATE TABLE IF NOT EXISTS user_favorites (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    movie_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    overview TEXT,
    poster_path VARCHAR(255),
    release_date DATE,
    vote_average NUMERIC(4, 2),
    added_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT user_favorites_user_fk
        FOREIGN KEY (user_id)
        REFERENCES user_details(id)
        ON DELETE CASCADE,

    CONSTRAINT user_favorites_user_movie_unique
        UNIQUE (user_id, movie_id)
);

CREATE INDEX IF NOT EXISTS user_favorites_user_id_index
ON user_favorites (user_id);

CREATE INDEX IF NOT EXISTS user_favorites_added_at_index
ON user_favorites (added_at DESC);
