class User < ApplicationRecord
  include UserRoles
  
  has_many :messages
  has_many :sites
  has_and_belongs_to_many :roles

  
  def self.find_or_create_from_auth_hash(auth)
    #to add roles, do something where you find the user by email here and update, or create the new user
    #that way we dont have to know the uid beforehand and can add roles before they sign in
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.email = auth.info.email
      user.picture = auth.info.image
      user.save!
    end
  end

  def self.current_id
    Thread.current[:user_id]
  end
  def self.current_id=(user_id)
    Thread.current[:user_id] = user_id
  end

  def full_name
    first_name + ' ' + last_name
  end
end
