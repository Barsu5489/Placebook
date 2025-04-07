# db/seeds.rb
admin_email = ENV['ADMIN_EMAIL'] || 'admin@example.com'
admin_password = ENV['ADMIN_PASSWORD'] || SecureRandom.alphanumeric(12)

admin = User.create_or_find_by(email_address: admin_email) do |user|
  user.password = admin_password
  user.admin = true
end

puts "Admin credentials: email=#{admin_email}, password=#{admin_password}"
