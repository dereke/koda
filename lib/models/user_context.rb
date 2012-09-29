class UserContext
    
  def self.user_bag
    @@user_bag
  end  
  
  def self.user_bag=(value)
    @@user_bag = value
  end
    
  def self.current_user
    @@user_bag['koda_user']
  end
  
  def self.current_user=(value)
    @@user_bag['koda_user'] = value
  end
  
end