angular.module('tickitup')
    .factory('TicketService',function($state, $http, $q, _, ClienteService){

        var endpoint = 'http://ofertas-api-rest.herokuapp.com/api/tickets?filter[where][clienteId]=';
        //var endpoint = '192.168.0.6:3000/api';
        //############################################
        // Init
        //############################################
        var TicketService = {};

        //############################################
        // Remote calls
        //############################################

        /**
         * Traer los tiquetes del DB remoto
         * @returns {Promise}
         */
        TicketService.getTicketsRemote = function(){
            var currentClient = ClienteService.getLoggedClient();
            var tickets = $http.get(endpoint+currentClient.clienteId);
            return tickets;
        }



        //############################################
        // Local Calls
        //############################################


        /**
         * Guardar tickets en local
         * @param data - Json con ofertas
         */
        TicketService.saveTickets= function(data){
            window.localStorage.setItem("tickets" , data);
        }


        TicketService.getMisTickets = function () {

            //FORMA REAL - LocalStorage
            var dfd = $q.defer();
            var data = window.localStorage.getItem("tickets");
            if(data != null)
                var tickets = JSON.parse(data)
            dfd.resolve(tickets);
            if(data == null)
                console.log('data nulo');
            return dfd.promise;

            //FORMA MOCK - DB JSON
            // var dfd = $q.defer();
            // $http.get('databases/misCompras.json').success(function(database){
            //     //console.log(database.ofertas)
            //     dfd.resolve(database.compras);
            // });
            // return dfd.promise;

        }
        
        TicketService.getTicket = function (ticketId) {


            //FORMA REAL - LocalStorage
            var dfd = $q.defer();
            var data = window.localStorage.getItem("tickets");
            //console.log(data);
            if(data != null)
                var products = _.find(JSON.parse(data), function(ticket){return ticket.id == ticketId})
                dfd.resolve(products);
            if(data == null)
                console.log('data nulo');
            return dfd.promise;

            //FORMA MOCK - DB JSON
            // var dfd = $q.defer();
            // $http.get('databases/misCompras.json').success(function(database) {
            //     var ticket = _.find(database.compras, function(ticket){ return ticket.id == ticketId; });
            //     dfd.resolve(ticket);
            // });
            // return dfd.promise;
            
        }

        return TicketService;



    });