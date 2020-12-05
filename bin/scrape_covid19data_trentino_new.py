# -*- coding: utf-8 -*-
import geopandas as gpd
import pandas as pd
import requests
from datetime import datetime,timezone

#stato_comuni_geo = 'https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/attuale/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='
stato_comuni_geo = "https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/attuale/FeatureServer/0/query?f=pgeojson&where=contagi%20%3E%200&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&maxRecordCountFactor=4&orderByFields=guariti%20DESC&outSR=4326&resultOffset=0&resultRecordCount=8000&cacheHint=true&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A1.0583354500042335%2C%22extent%22%3A%7B%22xmin%22%3A1172990.37869218%2C%22ymin%22%3A5734154.596375577%2C%22xmax%22%3A1330201.2886771664%2C%22ymax%22%3A5862773.329983189%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D%7D"
dati_comuni = gpd.read_file(stato_comuni_geo)
dati_comuni['lat'] = None
dati_comuni['lon'] = None
dati_comuni['lon'] = dati_comuni['geometry'].apply(lambda x: x.x)
dati_comuni['lat'] = dati_comuni['geometry'].apply(lambda x: x.y)

#andamento="https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/pat/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=riferimen%20asc&resultOffset=0&resultRecordCount=2000&cacheHint=true"
#andamento="https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/pat/FeatureServer/0/query?f=json&where=0=0&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&resultOffset=0&resultRecordCount=50&cacheHint=true"
#andamento="https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/pat/FeatureServer/0//query?where=0%3D0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=riferimen&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token="
#andamento="https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/pat/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=riferimen%20asc&resultOffset=0&resultRecordCount=4000&resultType=standard&cacheHint=true"
andamento='https://services5.arcgis.com/9T5RxYdubL4b1BrS/arcgis/rest/services/pat/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=riferimen%20asc&resultOffset=0&resultRecordCount=4000&resultType=standard&cacheHint=true'
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
    nname="NR CASI" #,LATITUDINE,LONGITUDINE
  newcolumns[name] = nname

andamento = andamento.rename(columns=newcolumns)
andamento.riferimen = andamento.riferimen.apply(str)
 
def getDay(x):
  x = x[:10]
  dt_object = datetime.fromtimestamp(int(x)) #p,tz=timezone.utc)
  s = dt_object.strftime("%d/%m/%Y")
  return s

andamento['giorno'] = None
andamento['giorno'] = andamento['riferimen'].apply(lambda x: getDay(x))

andamento.drop(['FID','riferimen','Shape__Area', 'Shape__Length'], axis='columns', inplace=True)

dati_comuni.ins = dati_comuni.ins.apply(str)
dati_comuni['aggiornamento'] = None
dati_comuni['aggiornamento'] = dati_comuni['ins'].apply(lambda x: getDay(x))
#dati_comuni = dati_comuni[['codice','nome','contagi','guariti','decessi','aggiornamento','lat','lon']] #,'nome','contagi','guariti','decessi','aggiornamento','lat','lon']]
dati_comuni = dati_comuni[['codice','nome','contagi','guariti','decessi','dimessi','residenti','tot_dime','lat','lon','aggiornamento']]
andamento.to_csv("stato_clinico_td.csv",index=False)
dati_comuni.to_csv("stato_comuni_td.csv",index=False)
