require 'em-websocket'

EM.run {

  @cities = %w(Rennes Rouen Paris Lille Strasbourg Lyon Dijon Marseille Ajaccio Toulouse Bordeaux Orléans Nantes)
  @clients = []

  EM::WebSocket.run(:host => "192.168.0.29", :port => 9090) do |ws|
    ws.onopen { |handshake|
      @clients << ws
      puts "New client connected"
    }

    ws.onclose {
        puts "Connection closed"
        @clients.delete ws
    }

    ws.onmessage { |msg|
      puts "New message: #{msg}"

      # Mapping entre l'identifiant reçu et le nom de ville attendu par l'application
      data = msg.split '/'

      sourceCityName = @cities[data[0].to_i - 1]
      targetCityName = @cities[data[1].to_i - 1]

      msg = "#{sourceCityName}/#{targetCityName}/#{data[2]}"

      puts "Sending message: #{msg}"

      @clients.each do |socket|
        socket.send msg
      end
    }
  end
}
