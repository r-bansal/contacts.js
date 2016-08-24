# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/contacts' do
  content_type :json
  Contact.all.order(last_name: :asc, first_name: :asc).to_json(include: :phone_numbers)
end

post '/api/contacts/create' do
  params[:first_name] = params[:first_name].capitalize
  params[:last_name] = params[:last_name].capitalize
  @contact = Contact.new(params)
  if @contact.save
    @contact.to_json
  else
    500
  end
end

get '/api/contacts/edit/:id' do
  content_type :json
  Contact.find(params[:id]).to_json
end

post '/api/contacts/update' do
  @contact = Contact.find(params[:id])
  if @contact.update(params)
    @contact.to_json
  else
    500
  end
end

post '/api/contacts/delete/:id' do
  @contact = Contact.find(params[:id])
  @contact.destroy
end

post '/api/phone_numbers/create' do
  @contact = Contact.find(params[:contact_id])
  @contact.phone_numbers.new(params)
  unless @contact.save
    500
  end
end
