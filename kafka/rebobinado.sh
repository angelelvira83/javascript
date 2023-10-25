# Utilidad de rebobinado de tópicos

# EJECUCIÓN: ./rebobinado.sh <consumer_group> <tópico> <fichero de configuración>
# Un ejemplo de configuración se incluye en "config" de este proyecto

if [ $# -eq 0 ]
  then
    echo "ERROR ----------------------------------------"
    echo "El script va con tres parámetros"
    echo './rebobinado.sh QFB-000.internal-streams-mixer-badge-intervals-pcsflm  QFB-000.PRODUCTS.FIREFLY_MIXER.BADGE_NGOB.TOP MixerAve.config'
    echo 'Parámetro 1: grupo consumo. EJ: QFB-000.internal-streams-mixer-badge-intervals-pcsflm '
    echo 'Parámetro 2: tópico. EJ: QFB-000.PRODUCTS.FIREFLY_MIXER.BADGE_NGOB.TOP'
    echo 'Parámetro 3: fichero configuración. EJ: MixerAve.config'
    exit -1
fi

if [ -z "$2" ]
  then
    echo "ERROR ----------------------------------------"
    echo "El script va con tres parámetros"
    echo './rebobinado.sh QFB-000.internal-streams-mixer-badge-intervals-pcsflm  QFB-000.PRODUCTS.FIREFLY_MIXER.BADGE_NGOB.TOP MixerAve.config'
    echo 'Parámetro 2: tópico. EJ: QFB-000.PRODUCTS.FIREFLY_MIXER.BADGE_NGOB.TOP'
    echo 'Parámetro 3: fichero configuración. EJ: MixerAve.config'
    exit -2
fi

if [ -z "$3" ]
  then
    echo "ERROR ----------------------------------------"
    echo "El script va con tres parámetros"
    echo './rebobinado.sh QFB-000.internal-streams-mixer-badge-intervals-pcsflm  QFB-000.PRODUCTS.FIREFLY_MIXER.BADGE_NGOB.TOP MixerAve.config'
    echo 'Parámetro 3: fichero configuración. EJ: MixerAve.config'
    exit -3
fi


# EJEMPLO COMPLETO
# ./rebobinado.sh QFB-000.internal-streams-mixer-badge-intervals-pcsflm  QFB-000.PRODUCTS.FIREFLY_MIXER.BADGE_NGOB.TOP MixerAve.config
#/media/angel/Datos/Software/confluent-6.2.0/bin/kafka-consumer-groups --bootstrap-server WWAZUR0018E4006.eci.geci:9092 --group QFB-000.internal-streams-mixer-badge-intervals-pcsflm --topic QFB-000.PRODUCTS.FIREFLY_MIXER.BADGE_NGOB.TOP --execute --reset-offsets --to-latest --command-config /media/angel/Datos/Software/confluent-6.2.0/config/MixerAve.config

a='/media/angel/Datos/Software/confluent-6.2.0/'

/media/angel/Datos/Software/confluent-6.2.0/bin/kafka-consumer-groups --bootstrap-server WWAZUR0018E4006.eci.geci:9092 --group $1 --topic $2 --execute --reset-offsets --to-latest --command-config ${a}$3

