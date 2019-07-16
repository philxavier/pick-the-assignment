let postString =
  "Abidjan,e,d--Abu Dhabi,e,c--Abuja,e,d--Accra,e,d--Addis Ababa,e,d--Amman,e,d--Ankara,e,c--Algiers,e,c--Asuncion,vc,b--Asuncion,e,b--Astana,e,c--Athens,e,a--Atlanta,cg,a--Baghdad,e,d--Baku,e,c--Bamako,e,d--Bangkok,e,c--Barcelona,cg,a--Basseterre,e,c--Beirut,e,c--Belgrade,e,c--Belmopan,e,d--Berlin,e,a--Bern,e,a--Bissau,e,d--Bogota,e,b--Boston,cg,a--Bratislava,e,b--Brazzaville,e,d--Bridgetown,e,c--Brussels,e,a--Brussels,cg,a--Brussels,m,a--Bucharest,e,b--Budapest,e,b--Buenos Aires,e,a--Buenos Aires,cg,a--Cayenne,cg,d--Cairo,e,c--Canberra,e,b--Caracas,e,d--Caracas,cg,d--Khartoum,e,d--Castries,e,c--Chicago,cg,a--Chui,c,b--Cape Town,cg,b--Ciudad del Este,cg,c--Cobija,c,d--Cochabamba,cg,c--Colombo,e,d--Conakry,e,d--Concepcion,vc,b--Copenhagen,e,a--Cordoba,cg,b--Cotonou,e,d--Dhaka,e,d--Dakar,e,d--Damascus,e,d--Dar es Salaam,e,d--Dili,e,d--Doha,e,c--Dublin,e,a--Encarnacion,vc,b--Faro,cg,a--Frankfurt,cg,a--Freetown,e,d--Gaborone,e,d--Geneva,cg,a--Geneva,m,a--Geneva,m,a--Geneva,m,a--Georgetown,e,d--Guangzhou,cg,c--Guatemala,e,c--Guayaramerin,c,d--Guyana City,c,d--Hamamatsu,cg,c--Hanoi,e,c--Harare,e,d--Hartford,cg,a--Havana,e,c--Helsinki,e,b--Hong Kong,cg,c--Houston,g,a--Iquitos,c,d--Islamabad,e,d--Istanbul,cg,c--Jakarta,e,d--Kathmandu,e,d--Kyiv,e,c--Kingston,e,c--Kingstown,e,c--Kinshasa,e,d--Kuala Lumpur,e,c--Kuwait,e,c--La Paz,e,c--Lagos,cg,d--Lethem,vc,d--Leticia,vc,d--Libreville,e,d--Lilongwe,e,d--Lima,e,b--Lisbon,cg,a--Lisbon,e,a--Lisbon,m,a--Ljubljana,e,b--Lome,e,d--London,cg,a--London,e,a--London,m,a--Los Angeles,cg,a--Luanda,e,d--Lusaka,e,d--Madrid,e,a--Madrid,cg,a--Malabo,e,d--Managua,e,d--Manila,e,d--Maputo,e,d--Muscat,e,c--Mendoza,cg,b--Mexico city,e,b--Mexico City,cg,b--Miami,cg,a--Milan,cg,a--Minsk,e,c--Monrovia,e,d--Montevideo,e,b--Montevideo,cg,b--Montevideo,m,b--Montreal,cg,a--Montreal,m,a--Moscow,e,c--Mumbai,cg,d--Munich,cg,a--Nagoya,cg,c--Nairobi,e,d--Nassau,e,c--Nicosia,e,b--Nouakchott,e,d--NewDelhi,e,c--New York,cg,a--New York,m,a--New York,ef,a--Oslo,e,b--Ottawa,e,a--Ouagadougou,e,d--Panama City,e,b--Paramaribo,e,d--Paris,e,a--Paris,cg,a--Paris,m,a--Paso de los Libres,c,b--Pedro Juan Caballero,c,d--Beijing,e,c--Porto,cg,a--Porto au Prince,e,d--Port of Spain,e,c--Prague,e,b--Praia,e,d--Pretoria,e,c--Puerto Ayacucho,vc,d--Puerto Iguazu,c,b--Puerto Quijarro,c,d--Pyongyang,e,d--Quito,e,b--Rabat,e,c--Ramallah,er,d--Riyadh,e,c--Rio Branco,vc,b--Rivera,cg,b--Rome,e,a--Rome,cg,a--Rome,m,a--Roseau,e,c--Rotterdam,cg,a--Saint George's,e,c--Saint Georges de L'Oyapock,c,d--Saint John's,e,c--Salto del Guaíra,c,c--Santa Cruz de la Sierra,cg,c--Santa Elena do Uairén,vc,d--Santiago,e,b--Santiago,cg,b--San Domingo,e,c--San Francisco,cg,a--San Jose,e,b--San Salvador,e,c--San Tome and Principe,e,d--Sarajevo,e,c--Seoul,e,c--Shanghai,cg,c--Singapore,e,b--Sofia,e,c--Stockholm,e,a--Sydney,cg,b--Taipei,ec,c--Tallinn,e,b--Tbilisi,e,c--Tehran,e,c--Tegucigalpa,e,d--Tel Aviv,e,b--The Hague,e,a--Tirane,e,c--Tokyo,cg,b--Tokyo,e,b--Toronto,cg,a--Tripoli,e,d--Tunis,e,c--Vancouver,cg,a--Vatican,e,a--Vienna,e,a--Vienna,m,a--Warsaw,e,b--Washington,cg,a--Washington,e,a--Washington,m,a--Wellington,e,b--Windhoek,e,d--Yangon,e,d--Yerevan,e,c--Yaounde,e,d--Zagreb,e,b--Zurich,cg,a";

function cleanString(inputString) {
  var arr = inputString
    .split("--")
    .join()
    .split(",");
  return arr.filter(ele => {
    return ele.length > 2;
  });
}

var namesOfCities = cleanString(postString);

module.exports = {
  postString,
  namesOfCities
};
