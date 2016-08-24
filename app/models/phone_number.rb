class PhoneNumber < ActiveRecord::Base
  belongs_to :contact

  validates :name,
    presence: true,
    length: {minimum: 2}

  validates :number,
    presence: true
end
