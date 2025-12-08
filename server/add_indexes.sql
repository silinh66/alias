-- Add index for sorting by created_at
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- Add index for filtering by category and sorting
CREATE INDEX idx_posts_category_created ON posts(category_id, created_at);
