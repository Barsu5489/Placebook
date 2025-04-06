require 'rails_helper'

RSpec.describe User, type: :model do
  # Basic model tests
  it "is valid with valid attributes" do
    user = User.new(
      email_address: "test@example.com",
      password: "password123",
      password_confirmation: "password123"
    )
    expect(user).to be_valid
  end

  it "is not valid without an email" do
    user = User.new(password: "password123")
    expect(user).to_not be_valid
  end

  it "is not valid with a duplicate email" do
    User.create(
      email_address: "test@example.com",
      password: "password123",
      password_confirmation: "password123"
    )
    user = User.new(
      email_address: "test@example.com",
      password: "password123",
      password_confirmation: "password123"
    )
    expect(user).to_not be_valid
  end

  # Test password functionality
  it "is not valid with a blank password" do
    user = User.new(email_address: "test@example.com")
    expect(user).to_not be_valid
  end

  # Test associations
  it "can have many locations" do
    user = User.new
    expect(user).to respond_to(:locations)
  end
end