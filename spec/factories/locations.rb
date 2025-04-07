FactoryBot.define do
  factory :location do
    name { "MyString" }
    latitude { "9.99" }
    longitude { "9.99" }
    user { nil }
  end
end
