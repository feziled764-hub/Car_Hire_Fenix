-- Seed vehicles data
INSERT INTO public.vehicles (name, category, image_url, daily_rate, is_available, features) VALUES
-- Sedans
('Toyota Corolla', 'sedan', 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&q=80', 450.00, true, ARRAY['Air Conditioning', 'Bluetooth', 'USB Ports', '5 Seats']),
('Honda Civic', 'sedan', 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=600&q=80', 500.00, true, ARRAY['Air Conditioning', 'Bluetooth', 'Backup Camera', '5 Seats']),
('Hyundai Elantra', 'sedan', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80', 420.00, false, ARRAY['Air Conditioning', 'Bluetooth', '5 Seats']),

-- SUVs
('Toyota Fortuner', 'suv', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80', 850.00, true, ARRAY['4x4', 'Air Conditioning', 'Bluetooth', '7 Seats', 'Roof Rack']),
('Ford Everest', 'suv', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80', 900.00, true, ARRAY['4x4', 'Air Conditioning', 'Leather Seats', '7 Seats']),
('Nissan X-Trail', 'suv', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80', 750.00, false, ARRAY['Air Conditioning', 'Bluetooth', '5 Seats', 'Panoramic Roof']),

-- Pickups
('Toyota Hilux Double Cab', 'pickup', 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600&q=80', 700.00, true, ARRAY['4x4', 'Air Conditioning', 'Tow Bar', '5 Seats']),
('Ford Ranger Double Cab', 'pickup', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', 750.00, true, ARRAY['4x4', 'Air Conditioning', 'Bluetooth', '5 Seats']),
('Isuzu D-Max', 'pickup', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80', 680.00, true, ARRAY['4x4', 'Air Conditioning', '5 Seats']),

-- Luxury
('Mercedes E-Class', 'luxury', 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80', 1500.00, true, ARRAY['Leather Seats', 'Navigation', 'Premium Sound', '5 Seats']),
('BMW 5 Series', 'luxury', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', 1600.00, false, ARRAY['Leather Seats', 'Navigation', 'Sunroof', '5 Seats']),
('Audi A6', 'luxury', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80', 1550.00, true, ARRAY['Leather Seats', 'Navigation', 'Quattro AWD', '5 Seats'])

ON CONFLICT DO NOTHING;
