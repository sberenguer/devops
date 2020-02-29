#Ejercicio1 

def tipoDeNumero(inputList):
    print("Lista de entrada: "+str(inputList))
    for numero in inputList:
        calculaDivisores(numero)
        #print("Divisores calculados para "+ str(numero))
       

def calculaDivisores(n):
    print("Calculando divisores de " + str(n))
    
    divisores=[]
    if n == 0:
        divisores.append(n)
    else:
        for i in range(1, n+1):
            if n%i == 0:
                divisores.append(i)
    print(divisores)        
    return divisores
    

def esPerfecto(n, divisores):
    print("Calculando si " + str(n) + " es perfecto...")



def esAbundante(n, divisores):
    print("Calculando si " + str(n) + " es abundante...")


def esDefectivo(n, divisores):
    print("Calculando si " + str(n) + " es defectivo...")

print("Ejercicio 1")
#tipoDeNumero([1,2,3])
