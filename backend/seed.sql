-- ===========================
-- Users
-- Password hash is a placeholder.
-- Replace with actual bcrypt hashes if you want login to work.
-- ===========================

INSERT INTO users
(first_name, last_name, email, role, hash_password)
VALUES
('Admin', 'User', 'admin@example.com', 'ADMIN', '$2b$10$JIF64yE067/gGVP82fNkue1jwJJJmfPNhOmsOl8Rs3jkLlGIRmu/6'),
('Alice', 'Johnson', 'alice@example.com', 'AGENT', '$2b$10$JIF64yE067/gGVP82fNkue1jwJJJmfPNhOmsOl8Rs3jkLlGIRmu/6'),
('Bob', 'Smith', 'bob@example.com', 'AGENT', '$2b$10$JIF64yE067/gGVP82fNkue1jwJJJmfPNhOmsOl8Rs3jkLlGIRmu/6'),
('Charlie', 'Brown', 'charlie@example.com', 'REQUESTER', '$2b$10$JIF64yE067/gGVP82fNkue1jwJJJmfPNhOmsOl8Rs3jkLlGIRmu/6'),
('Diana', 'Prince', 'diana@example.com', 'REQUESTER', '$2b$10$JIF64yE067/gGVP82fNkue1jwJJJmfPNhOmsOl8Rs3jkLlGIRmu/6'),
('Ethan', 'Hunt', 'ethan@example.com', 'REQUESTER', '$2b$10$JIF64yE067/gGVP82fNkue1jwJJJmfPNhOmsOl8Rs3jkLlGIRmu/6');



-- ===========================
-- Categories
-- ===========================

INSERT INTO categories (category)
VALUES
('Account Access'),
('Software Help'),
('Hardware'),
('Networking'),
('Website'),
('Email'),
('Printing'),
('General Question');



-- ===========================
-- Locations
-- ===========================

INSERT INTO locations (location)
VALUES
('Beatty'),
('Swearingen'),
('Library'),
('Capstone'),
('Russell House'),
('Engineering Building'),
('Dorm A'),
('Dorm B');



-- ===========================
-- Tickets
-- ===========================

INSERT INTO tickets
(
title,
description,
status,
priority,
category,
requester_id,
assignee_id,
location
)
VALUES
(
'Cannot access GitHub',
'My GitHub organization invite expired.',
'OPEN',
'HIGH',
'Account Access',
4,
2,
'Engineering Building'
),
(
'Laptop will not boot',
'The laptop shows a black screen after powering on.',
'IN_PROGRESS',
'CRITICAL',
'Hardware',
5,
3,
'Beatty'
),
(
'Need Adobe license',
'Please assign me an Adobe Creative Cloud license.',
'RESOLVED',
'LOW',
'Software Help',
6,
2,
'Library'
),
(
'Campus WiFi disconnects',
'Wireless connection drops every few minutes.',
'OPEN',
'MEDIUM',
'Networking',
4,
NULL,
'Dorm A'
),
(
'Website contact form broken',
'Submitting the contact form returns an error.',
'CLOSED',
'HIGH',
'Website',
5,
3,
'Capstone'
),
(
'Printer out of toner',
'Printer on second floor is not printing.',
'OPEN',
'LOW',
'Printing',
6,
NULL,
'Library'
);



-- ===========================
-- Comments
-- ===========================

INSERT INTO comments
(
body,
ticket_id,
author_id,
is_internal
)
VALUES
(
'We are looking into this issue.',
1,
2,
FALSE
),
(
'User likely needs a new organization invitation.',
1,
2,
TRUE
),
(
'Have you tried restarting the laptop?',
2,
3,
FALSE
),
(
'Motherboard may need replacement.',
2,
3,
TRUE
),
(
'License assigned successfully.',
3,
2,
FALSE
),
(
'Waiting for requester confirmation.',
3,
2,
TRUE
),
(
'Issue reproduced by IT staff.',
5,
3,
TRUE
),
(
'The contact form should now be working.',
5,
3,
FALSE
);