# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# First, delete any existing users to ensure clean state
User.delete_all

# Create a test user
user = User.create!(
  email_address: 'test@example.com',
  password: 'password123',
  password_confirmation: 'password123'
)

puts "Test user created: #{user.email_address} / password123"
