namespace :sessions do
  desc "Clean up expired sessions"
  task cleanup: :environment do
    deleted_count = Session.expired.delete_all
    puts "Cleaned up #{deleted_count} expired sessions"
  end
end
