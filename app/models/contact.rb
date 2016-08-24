class Contact < ActiveRecord::Base
  has_many :phone_numbers

  validates :first_name, :last_name,
    presence: true,
    length: {minimum: 2}

  validates :email,
    presence: true
end
