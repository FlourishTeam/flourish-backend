DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS plants CASCADE; 
DROP TABLE IF EXISTS user_plants CASCADE; 
DROP TABLE IF EXISTS users_plants_logs CASCADE;

CREATE TABLE users(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE plants(
    plant_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    image TEXT,
    common_name TEXT NOT NULL,
    synonyms TEXT NOT NULL,
    scientific_name TEXT NOT NULL,
    light_range TEXT NOT NULL,
    hydration_range TEXT NOT NULL,
    care_difficulty TEXT NOT NULL,
    pests_diseases TEXT NOT NULL,
    warnings TEXT NOT NULL,
    height TEXT NOT NULL,
    spread TEXT NOT NULL,
    type TEXT NOT NULL,
    flowering_period TEXT NOT NULL,
    bloom_size TEXT NOT NULL,
    temperature_range TEXT NOT NULL,
    placement TEXT NOT NULL,
    humidity_level TEXT NOT NULL,
    substrate_recommendation TEXT NOT NULL,
    potting_notes TEXT NOT NULL,
    watering TEXT NOT NULL,
    propagation TEXT NOT NULL
);

CREATE TABLE user_plants(
    user_plant_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    plant_id BIGINT REFERENCES plants(plant_id)
);

CREATE TABLE users_plants_logs(
    user_plant_log_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
	plant_id BIGINT REFERENCES plants(plant_id) ON DELETE CASCADE,
    user_plant_id BIGINT REFERENCES user_plants(user_plant_id) ON DELETE CASCADE,
    care_date TEXT NOT NULL,
    care_type VARCHAR (255) NOT NULL,
    care_note TEXT NOT NULL
);