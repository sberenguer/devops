#Ejercicio1 

#Dada una lista de numeros como parametro, para cada numero se indica si
#es perfecto, abundante o defectivo
#   Un número perfecto es aquel que es igual a la suma de sus divisores
#propios positivos, excluyéndose a sí mismo. Por ejemplo 6 = 1+2+3
#   Un número abundante es aquel que la suma de los divisores propios es
#mayor que el número.
#   Un número defectivo es aquel que la suma de los divisores propios es
#menor que el número.

def getTipoDeNumeros(lista):
    print("Lista de números de entrada: " + str(lista))
    for numero in lista:
        calculaDivisoresYTipo(numero)

# Funcion para obtener los divisores de un numero       
# n: numero al que vamos a calcular sus divisores y determinar su tipo
def calculaDivisoresYTipo(n):        
    if n == 0:
        print("El 0 no tiene divisores")
    else:
        sumatorio = 0
        for i in range(1, n):
            if n%i == 0:
                sumatorio +=i
        
        esPerfectoAbundanteODefectivo(n, sumatorio)

# Funcion para indicar si un numero es perfecto, defectivo o abundante
# a partir de de sus divisores propios y excluyendose a si mismo
# num: El numero  
# sumaDivisores: sumatorio de los divisores propios de num
def esPerfectoAbundanteODefectivo(num, sumaDivisores):
    if sumaDivisores == num:
        print("El número "+ str(num) + " es perfecto")
        
    elif sumaDivisores > num:
        print("El número "+ str(num) + " es abundante")

    else:
        print("El número "+ str(num) + " es defectivo")
