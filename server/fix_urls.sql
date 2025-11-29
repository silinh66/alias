UPDATE posts SET thumbnail_url = REPLACE(thumbnail_url, 'http://localhost:5000', '') WHERE thumbnail_url LIKE 'http://localhost:5000%';
UPDATE posts SET pdf_url = REPLACE(pdf_url, 'http://localhost:5000', '') WHERE pdf_url LIKE 'http://localhost:5000%';
