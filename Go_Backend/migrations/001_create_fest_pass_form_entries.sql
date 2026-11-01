-- Create fest_pass_form_entries table
CREATE TABLE
    IF NOT EXISTS fest_pass_form_entries (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        mobile_number VARCHAR(10) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_fest_pass_email ON fest_pass_form_entries (email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_fest_pass_created_at ON fest_pass_form_entries (created_at DESC);