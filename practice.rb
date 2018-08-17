def func1(a,b,num)
  puts a
  yield a,b
  puts b
end

func1(1,2,3){}