DROP TABLE IF EXISTS users CASCADE; 

CREATE TABLE users(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL
)






























































CREATE TABLE users_plants_logs(
    user_plant_log_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    user_plant_id BIGINT REFEENCES user_plants(user_plant_id),
    plant_note TEXT NOT NULL,
    care_date DATE NOT NULL,
    care_note VARCHAR (20) NOT NULL,
);


    -- care_dropdown VARCHAR (255) NOT NULL,
    --     CHECK([care_dropdown]) IN ('water', 'mist', 'repot', 'nutrients', 'sunlight');