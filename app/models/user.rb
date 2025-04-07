class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :locations, dependent: :destroy


  normalizes :email_address, with: ->(e) { e.strip.downcase }

  validates :email_address, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true, on: :create
  def admin?
    admin
  end
end
