DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS plants CASCADE; 

CREATE TABLE users(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL
)

CREATE TABLE plants(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFEENCES users(user_id),
    common_name TEXT NOT NULL,
    scientific_name TEXT NOT NULL,
    light_rang TEXT NOT NULL,
    hydration_range TEXT NOT NULL,
    care_difficulty TEXT NOT NULL,
    temperature_range TEXT NOT NULL,
    placement TEXT NOT NULL,
    humidity_level TEXT NOT NULL,
    substrate_recommendation TEXT NOT NULL,
    potting_notes TEXT NOT NULL,
    watering TEXT NOT NULL
);

