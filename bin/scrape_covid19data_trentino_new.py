# -*- coding: utf-8 -*-
import geopandas as gpd
import pandas as pd
import requests
from datetime import datetime,timezone

def getDay(x):
  x = x[:10]
  dt_object = datetime.fromtimestamp(int(x)) #p,tz=timezone.utc)
  s = dt_object.strftime("%d/%m/%Y")
  return s

#stato_comuni_geo = "https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/attuale/FeatureServer/0/query?f=pgeojson&where=contagi%20%3E%200&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&maxRecordCountFactor=4&orderByFields=guariti%20DESC&outSR=4326&resultOffset=0&resultRecordCount=8000&cacheHint=true&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A1.0583354500042335%2C%22extent%22%3A%7B%22xmin%22%3A1172990.37869218%2C%22ymin%22%3A5734154.596375577%2C%22xmax%22%3A1330201.2886771664%2C%22ymax%22%3A5862773.329983189%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D%7D"
#stato_comuni_geo = "https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/dettaglio_poly/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=nome%20asc&outSR=102100&resultOffset=0&resultRecordCount=400&resultType=standard&cacheHint=true"
stato_comuni_geo = "https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/dettaglio/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=nome%20asc&outSR=102100&resultOffset=0&resultRecordCount=400&resultType=standard&cacheHint=true"
stato_comuni_geo = "https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/dettaglio/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=nome%20asc&outSR=4326&resultOffset=0&resultRecordCount=4000&resultType=standard&cacheHint=true"
#poly
# stato_comuni_geo = "https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/dettaglio_poly/FeatureServer/0/query?f=geojson&where=1%3D1&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=nome%20asc&outSR=4326&resultOffset=0&resultRecordCount=4000&resultType=standard&cacheHint=true"

dati_comuni = gpd.read_file(stato_comuni_geo)
dati_comuni['lat'] = None
dati_comuni['lon'] = None
dati_comuni['lon'] = dati_comuni['geometry'].apply(lambda x: x.x)
dati_comuni['lat'] = dati_comuni['geometry'].apply(lambda x: x.y)
# poly
#dati_comuni['lon'] = dati_comuni.geometry.representative_point().x
#dati_comuni['lat'] = dati_comuni.geometry.representative_point().y

dati_comuni.ins = dati_comuni.ins.apply(str)

dati_comuni.ins = dati_comuni.ins.apply(str)
dati_comuni['aggiornamento'] = None
dati_comuni['aggiornamento'] = dati_comuni['ins'].apply(lambda x: getDay(x))
#dati_comuni.drop(['FID','classid','ins','istat','istatcat','geometry'], axis='columns', inplace=True)
dati_comuni = dati_comuni[['codice','nome','contagi','guariti','decessi','dimessi','lat','lon','aggiornamento']]

andamento = "https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/totali_pat/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=riferimen%20asc&resultOffset=0&resultRecordCount=32000&resultType=standard&cacheHint=true"
r = requests.get(andamento)
d = r.json()
andamento = pd.json_normalize(d['features'])
oldcolumns = andamento.columns
newcolumns = {}
for name in oldcolumns:
  nname =  name.replace("attributes.","")
  if nname=="nome":
    nname="COMUNI"
  if nname=="contagi":
    nname="NR CASI"
  newcolumns[name] = nname
andamento = andamento.rename(columns=newcolumns)
andamento.riferimen = andamento.riferimen.apply(str)

andamento['giorno'] = None
andamento['giorno'] = andamento['riferimen'].apply(lambda x: getDay(x))

andamento.drop(['pos_att_in','guariti_in','decedu_in','molecolari','antigenici'],axis='columns', inplace=True)
andamento = andamento[['giorno','domicilio','infettive','alta_int','terapia_in','guariti','deceduti','totale_pos','pos_att','rsa','incremento','casa_cura','strut_int','tot_rsa','dimessi','nuovi','nuo_screen']]

andamento.to_csv("stato_clinico_td.csv",index=False)
dati_comuni.to_csv("stato_comuni_td.csv",index=False)
