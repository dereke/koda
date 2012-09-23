#
# add or modify these routes at your own discretion
#
get '/' do
  show :index
end

get '/:page?' do
  show :generic
end