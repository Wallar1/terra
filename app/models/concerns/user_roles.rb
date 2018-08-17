module UserRoles
  extend ActiveSupport::Concern

  def consultant?
    has_role?('consultant')
  end

  def manager?
    has_role?('manager')
  end

  def customer
    has_role?('customer')
  end



  def has_role?(name)
    active_roles.include?(name.downcase)
  end
  
  def has_any_of_roles? arr
    active_roles.each do |role|
      return true if arr.include?(role.downcase)
    end
    return false
  end

  def active_roles
    self.roles.pluck(:name)
  end
end