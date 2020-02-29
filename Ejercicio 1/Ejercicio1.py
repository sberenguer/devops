#Ejercicio1 

#Dada una lista de numeros como parametro, para cada numero se indica si
#es perfecto, abundante o defectivo
#   Un número perfecto es aquel que es igual a la suma de sus divisores
#propios positivos, excluyéndose a sí mismo. Por ejemplo 6 = 1+2+3
#   Un número abundante es aquel que la suma de los divisores propios es
#mayor que el número.
#   Un número defectivo es aquel que la suma de los divisores propios es
#menor que el número.

def tipoDeNumero(lista):
    print("Lista de números de entrada: "+str(lista))
    for numero in lista:
        calculaTipoDeNumero(numero)
       

def calculaTipoDeNumero(n):        
    if n == 0:
        print("El 0 no tiene divisores")
    else:
        divisores=[]
        sumatorio = 0
        for i in range(1, n):
            if n%i == 0:
                divisores.append(i)
                sumatorio +=i

        #print("Divisores propios de "+ str(n) + ": " + str(divisores))
        
        esPerfectoAbundanteODefectivo(n, sumatorio)

#A partir de un numero        
def esPerfectoAbundanteODefectivo(n, sumatorio):
    if sumatorio == n:
        print("El número "+ str(n) + " es perfecto")
        
    elif sumatorio < n:
        print("El número "+ str(n) + " es defectivo")

    else:
        print("El número "+ str(n) + " es abundante")
