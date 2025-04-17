CREATE TABLE pages
(
 id INT PRIMARY KEY AUTOINCREMENT,
 title VARCHAR(255) NOT NULL,
 url VARCHAR(255) NOT NULL
);

CREATE TABLE icons
(
 id INT PRIMARY KEY AUTOINCREMENT,
 name VARCHAR(255) NOT NULL,
 path VARCHAR(255) NOT NULL
);

CREATE TABLE contexts
(
 id INT PRIMARY KEY AUTOINCREMENT,
 name VARCHAR(255) NOT NULL,
 icon_id INT NOT NULL,
 FOREIGN KEY (icon_id) REFERENCES icons (id)
);

CREATE TABLE context_pages
(
 context_id INT,
 page_id INT,
 PRIMARY KEY (context_id, page_id),
 FOREIGN KEY (context_id) REFERENCES contexts (id),
 FOREIGN KEY (page_id) REFERENCES pages (id)
);